import { Contract } from '@ethersproject/contracts'
import { useEffect, useMemo, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {useBlock,parseCallKey} from '../hooks/swapHooks'
import { useMulticallContract } from '../hooks/contractHooks'
import useDebounce from '../hooks/useDebounce'
import { CancelledError, retry, RetryableError } from './retry'
import {ERROR_FETCHINT_MULTICAL_RESULTS, FETCHING_MULTICAL_RESULTS, UPDATE_MULTICAL_RESULTS } from "../../store/actions/types"
import store from '../../store/store'
export type AppDispatch = typeof store.dispatch
export type AppState = ReturnType<typeof store.getState>
export interface Call {
  address: string,
  callData: string
}

export function chunkArray<T>(items: T[], maxChunkSize: number): T[][] {
  if (!items) return []
  if (maxChunkSize < 1) throw new Error('maxChunkSize must be gte 1')
  if (items.length <= maxChunkSize) return [items]
  const numChunks: number = Math.ceil(items.length / maxChunkSize)
  const chunkSize = Math.ceil(items.length / numChunks)

  return [...Array(numChunks).keys()].map((ix) => items.slice(ix * chunkSize, ix * chunkSize + chunkSize))
}

// chunk calls so we do not exceed the gas limit
const CALL_CHUNK_SIZE = 500

/**
 * Fetches a chunk of calls, enforcing a minimum block number constraint
 * @param multicallContract multicall contract to fetch against
 * @param chunk chunk of calls to make
 * @param minBlockNumber minimum block number of the result set
 */
async function fetchChunk(
  multicallContract: Contract | any,
  chunk: Call[]  | any,
  minBlockNumber: number,
): Promise<{ results: string[]; blockNumber: number }> {
  console.debug('Fetching chunk', multicallContract, chunk, minBlockNumber)
  let resultsBlockNumber
  let returnData
  try {
    // prettier-ignore
    [resultsBlockNumber, returnData] = await multicallContract.aggregate(
      chunk.map((obj:any) => [obj?.address, obj?.callData])
    )
  } catch (error) {
    console.debug('Failed to fetch chunk inside retry', error)
    throw error
  }
  if (resultsBlockNumber.toNumber() < minBlockNumber) {
    console.debug(`Fetched results for old block number: ${resultsBlockNumber.toString()} vs. ${minBlockNumber}`)
    throw new RetryableError('Fetched for old block number')
  }
  return { results: returnData, blockNumber: resultsBlockNumber.toNumber() }
}

/**
 * From the current all listeners state, return each call key mapped to the
 * minimum number of blocks per fetch. This is how often each key must be fetched.
 * @param allListeners the all listeners state
 * @param chainId the current chain id
 */
export function activeListeningKeys(
  allListeners: AppState['multicalReducer']['callListeners'],
  chainId?: number,
): { [callKey: string]: number } {
  if (!allListeners || !chainId) return {}
  const listeners = allListeners[chainId]
  if (!listeners) return {}

  return Object.keys(listeners).reduce<{ [callKey: string]: number }>((memo, callKey) => {
    const keyListeners = listeners[callKey]

    memo[callKey] = Object.keys(keyListeners)
      .filter((key) => {
        const blocksPerFetch = parseInt(key)
        if (blocksPerFetch <= 0) return false
        return keyListeners[blocksPerFetch] > 0
      })
      .reduce((previousMin, current) => {
        return Math.min(previousMin, parseInt(current))
      }, 1)
    return memo
  }, {})
}

/**
 * Return the keys that need to be refetched
 * @param callResults current call result state
 * @param listeningKeys each call key mapped to how old the data can be in blocks
 * @param chainId the current chain id
 * @param currentBlock the latest block number
 */

export function outdatedListeningKeys(
  callResults: AppState['multicalReducer']['callResults'],
  listeningKeys: { [callKey: string]: number },
  chainId: number | undefined,
  currentBlock: number | undefined,
): string[] {
  if (!chainId || !currentBlock) return []
  const results = callResults[chainId]
  // no results at all, load everything
  if (!results) return Object.keys(listeningKeys)

  return Object.keys(listeningKeys).filter((callKey) => {
    const blocksPerFetch = listeningKeys[callKey]

    const data = callResults[chainId][callKey]
    // no data, must fetch
    if (!data) return true

    const minDataBlockNumber = currentBlock - (blocksPerFetch - 1)

    // already fetching it for a recent enough block, don't refetch it
    if (data.fetchingBlockNumber && data.fetchingBlockNumber >= minDataBlockNumber) return false

    // if data is older than minDataBlockNumber, fetch it
    return !data.blockNumber || data.blockNumber < minDataBlockNumber
  })
}

export default function Updater(): null {
  const dispatch = useDispatch<AppDispatch>()
  const state = store.getState().multicalReducer
  const chainId = 56
  // wait for listeners to settle before triggering updates
  const debouncedListeners = useDebounce(state.callListeners, 100)
  const {fromToken,toToken} = store.getState().walletReducer
  const { currentBlock } = useBlock()
  const multicallContract = useMulticallContract()
  const cancellations = useRef<{ blockNumber: number; cancellations: (() => void)[] }>()
  const listeningKeys: { [callKey: string]: number } = useMemo(() => {
    return activeListeningKeys(debouncedListeners, chainId)
  }, [debouncedListeners, chainId])
  const outdatedCallKeys = Object.keys(listeningKeys)
    if (!state.calls) return null
    useEffect(() => {
    const calls = outdatedCallKeys.map((key) => parseCallKey(key))
    const chunkedCalls = chunkArray(calls, CALL_CHUNK_SIZE)
    if (cancellations.current?.blockNumber !== currentBlock) {
      cancellations.current?.cancellations?.forEach((c) => c())
    }

    dispatch({ type: FETCHING_MULTICAL_RESULTS, payload: {
        calls,
        chainId,
        fetchingBlockNumber: currentBlock,
      }},
    )
    cancellations.current = {
      blockNumber: currentBlock,
      cancellations: chunkedCalls.map((chunk, index) => {
        const { cancel, promise } = retry(() => fetchChunk(multicallContract, chunk, currentBlock), {
          n: Infinity,
          minWait: 2500,
          maxWait: 3500,
        })
        promise
          .then(({ results: returnData, blockNumber: fetchBlockNumber }) => {
            cancellations.current = { cancellations: [], blockNumber: currentBlock }
            const firstCallKeyIndex = chunkedCalls.slice(0, index).reduce<number>((memo, curr) => memo + curr.length, 0)
            const lastCallKeyIndex = firstCallKeyIndex + returnData.length
        
            dispatch({type: UPDATE_MULTICAL_RESULTS, payload: {
                chainId,
                results: outdatedCallKeys.slice(firstCallKeyIndex, lastCallKeyIndex)
                  .reduce<{ [callKey: string]: string | null }>((memo, callKey, i) => {
                    memo[callKey] = returnData[i] ?? null
                    return memo
                  }, {}),
                blockNumber: fetchBlockNumber,
              }},
            )
          })
          .catch((error: any) => {
            if (error instanceof CancelledError) {
              console.debug('Cancelled fetch for blockNumber', currentBlock)
              return
            }
            console.error('Failed to fetch multicall chunk', chunk, chainId, error)
            dispatch({type: ERROR_FETCHINT_MULTICAL_RESULTS, payload: {
                calls: chunk,
                chainId,
                fetchingBlockNumber: currentBlock,
              }},
            )
          })
        return cancel
      }),
    }
  }, [state.calls,state.callListeners,currentBlock,fromToken,toToken])

  return null
}

