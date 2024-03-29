import { CurrencyAmount,currencyEquals, JSBI, Percent,Token,Pair, TokenAmount, Trade } from '@pancakeswap/sdk'
import { parseUnits } from '@ethersproject/units'
import { wrappedCurrency } from '../utils/wrappedCurrency.ts'
import { store } from '../../store/store';
import { isValidMethodArgs, toCallState, PairState } from './multical.ts'
import flatMap from 'lodash/flatMap'
import { Interface } from '@ethersproject/abi'
import IPancakePairABI from '../constants/abi/IPancakePairABI.json'
import {
	BASES_TO_CHECK_TRADES_AGAINST,
	CUSTOM_BASES,
	BETTER_TRADE_LESS_HOPS_THRESHOLD,
	ADDITIONAL_BASES,
  } from '../constants/constants.js'
import { types } from '../../store/actions/types'
import { CancelledError, retry } from '../utils/retry.ts'
import { fetchChunk, chunkArray } from '../utils/updater.tsx'
import { eth } from '@citadeldao/apps-sdk';
import MulticalABI from '../constants/abi/Multicall.json'

const ZERO_PERCENT = new Percent('0')
const ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/
const LOWER_HEX_REGEX = /^0x[a-f0-9]*$/

export function toCallKey(call) {
	if (!ADDRESS_REGEX.test(call?.address)) {
		console.log(`Invalid address`)
	}
	if (!LOWER_HEX_REGEX.test(call?.callData)) {
		console.log(`Invalid hex`)
	}
	return `${call?.address}-${call?.callData}`
}
export function parseCallKey(callKey) {
	const pcs = callKey.split('-')
	if (pcs.length !== 2) {
	  throw new Error(`Invalid call key: ${callKey}`)
	}
	return {
	  address: pcs[0],
	  callData: pcs[1],
	}
  }
  
export const getCallsData = (calls, options) => dispatch =>{
	const chainId  = 56
	const serializedCallKeys = JSON.stringify(
		  calls?.map(toCallKey)?.sort() ?? [],
		)
	const callKeys = JSON.parse(serializedCallKeys)
	if (!chainId || callKeys.length === 0) return undefined
	const call = callKeys.map((key) => parseCallKey(key))
	dispatch({type: types.ADD_MULTICAL_LISTENERS, payload: {chainId,call,options}})
	const CALL_CHUNK_SIZE = 500
	const outdatedCallKeys = call.map(item => {
		return item.address + '-' + item.callData
	})
	const { currentBlock } = store.getState().blocks
    const multicallContract = new eth.Contract('bsc', '0xfF6FD90A470Aaa0c1B8A54681746b07AcdFedc9B', MulticalABI);
	const chunkedCalls = chunkArray(call, CALL_CHUNK_SIZE)
	chunkedCalls.forEach((chunk, index) => {
        const { promise } = retry(() => fetchChunk(multicallContract, chunk, currentBlock), {
          n: Infinity,
          minWait: 2500,
          maxWait: 3500,
        })
        promise
          .then(({ results: returnData, blockNumber: fetchBlockNumber }) => {
          //  cancellations.current = { cancellations: [], blockNumber: currentBlock }
            const firstCallKeyIndex = chunkedCalls.slice(0, index).reduce((memo, curr) => memo + curr.length, 0)
            const lastCallKeyIndex = firstCallKeyIndex + returnData.length
            dispatch({type: types.UPDATE_MULTICAL_RESULTS, payload: {
                chainId,
                results: outdatedCallKeys.slice(firstCallKeyIndex, lastCallKeyIndex)
                  .reduce((memo, callKey, i) => {
                    memo[callKey] = returnData[i] ?? null
                    return memo
                  }, {}),
                blockNumber: fetchBlockNumber,
              }},
            )
          })
          .catch((error) => {
            if (error instanceof CancelledError) {
              console.log('Cancelled fetch for blockNumber', currentBlock)
              return
            }
          //  console.error('Failed to fetch multicall chunk', chunk, chainId, error)
            dispatch({type: types.ERROR_FETCHINT_MULTICAL_RESULTS, payload: {
                calls: chunk,
                chainId,
                fetchingBlockNumber: currentBlock,
              }},
            )
          })
		})

	const callResults = store.getState().multical.callResults
	dispatch({type: types.REMOVE_MULTICAL_LISTENERS,payload: {chainId,calls,options}})
	return calls?.map((call) => {
		  if (!chainId || !call) return types.INVALID_RESULT
		  const result = callResults[chainId]?.[toCallKey(call)]
		  let data
		  if (result?.data && result?.data !== '0x') {
			// eslint-disable-next-line prefer-destructuring
			data = result.data
		  }
		  return { valid: true, data, blockNumber: result?.blockNumber }
		})
  }

export function getParsedAmount(value, currency) {
	if (!value || !currency) {
	  return undefined
	}
	try {
	  const typedValueParsed = parseUnits(value, currency.decimals).toString()
	  if (typedValueParsed !== '0') {
		return currency instanceof Token
		  ? new TokenAmount(currency, JSBI.BigInt(typedValueParsed))
		  : CurrencyAmount.ether(JSBI.BigInt(typedValueParsed))
	  }
	} catch (error) {
	  // should fail if the getr specifies too many decimal places of precision (or maybe exceed max uint?)
		console.log(`Failed to parse input amount: "${value}"`, error)
	}
	// necessary for all paths to return a value
	return undefined
  }


  export const getMultipleContractSingleData = (addresses, contractInterface,methodName,callInputs,options) => dispatch => {
	const fragment = contractInterface.getFunction(methodName)
	const callData = fragment && isValidMethodArgs(callInputs)
		  ? contractInterface.encodeFunctionData(fragment, callInputs)
		  : undefined
	const calls = fragment && addresses && addresses.length > 0 && callData
		  ? addresses.map((address) => {
			  return address && callData
				? {
					address,
					callData,
				  }
				: undefined
			})
		  : []
	dispatch({type:types.SET_CALLS,payload: {chainId: 56,calls}})
	const results = dispatch(getCallsData(calls, options))
	const { currentBlock } = store.getState().blocks
	return results.map((result) => toCallState(result, contractInterface, fragment, currentBlock))
  }
  
  export const getPairs = (currencies) => dispatch => {
	const chainId = 56
	const tokens = currencies.map(([currencyA, currencyB]) => [
		  wrappedCurrency(currencyA, chainId),
		  wrappedCurrency(currencyB, chainId),
		])
	const pairAddresses = tokens.map(([tokenA, tokenB]) => {
		  return tokenA && tokenB && !tokenA.equals(tokenB) ? Pair.getAddress(tokenA, tokenB) : undefined
		})
	const PAIR_INTERFACE = new Interface(IPancakePairABI)
	const results = dispatch(getMultipleContractSingleData(pairAddresses, PAIR_INTERFACE, 'getReserves'))
	return results.map((result, i) => {
		const { result: reserves, loading } = result
		const tokenA = tokens[i][0]
		const tokenB = tokens[i][1]
  
		if (loading) return [PairState.LOADING, null]
		if (!tokenA || !tokenB || tokenA.equals(tokenB)) return [PairState.INVALID, null]
		if (!reserves) return [PairState.NOT_EXISTS, null]
		const { reserve0, reserve1 } = reserves
		const [token0, token1] = tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA]
		return [
		  PairState.EXISTS,
		  new Pair(new TokenAmount(token0, reserve0.toString()), new TokenAmount(token1, reserve1.toString())),
		]
	  })
  }
  
  const getAllCommonPairs = (currencyA, currencyB) => dispatch => {
	const chainId = 56
	const [tokenA, tokenB] = chainId
	  ? [wrappedCurrency(currencyA, chainId), wrappedCurrency(currencyB, chainId)]
	  : [undefined, undefined]
	let bases = []
	if (!chainId)  bases = []

	const common = BASES_TO_CHECK_TRADES_AGAINST[chainId] ?? []
	const additionalA = tokenA ? ADDITIONAL_BASES[chainId]?.[tokenA.address] ?? [] : []
	const additionalB = tokenB ? ADDITIONAL_BASES[chainId]?.[tokenB.address] ?? [] : []
  
	bases = [...common, ...additionalA, ...additionalB]
	const basePairs = flatMap(bases, (base) => bases.map((otherBase) => [base, otherBase]))
	const allPairCombinations = tokenA && tokenB
		  ? [
			  // the direct pair
			  [tokenA, tokenB],
			  // token A against all bases
			  ...bases.map((base) => [tokenA, base]),
			  // token B against all bases
			  ...bases.map((base) => [tokenB, base]),
			  // each base against all bases
			  ...basePairs,
			]
			  .filter((tokens) => Boolean(tokens[0] && tokens[1]))
			  .filter(([t0, t1]) => t0.address !== t1.address)
			  .filter(([tokenA_, tokenB_]) => {
				if (!chainId) return true
				const customBases = CUSTOM_BASES[chainId] 
				const customBasesA = customBases?.[tokenA_.address]
				const customBasesB = customBases?.[tokenB_.address]
				if (!customBasesA && !customBasesB) return true
				if (customBasesA && !customBasesA.find((base) => tokenB_.equals(base))) return false
				if (customBasesB && !customBasesB.find((base) => tokenA_.equals(base))) return false
  
				return true
			  })
		  : []
	const allPairs = dispatch(getPairs(allPairCombinations))
	// only pass along valid pairs, non-duplicated pairs
	return Object.values(
		  allPairs?.filter((result) => Boolean(result[0] === PairState.EXISTS && result[1]))
			// filter out duplicated pairs
			.reduce((memo, [, curr]) => {
			  memo[curr.liquidityToken.address] = memo[curr.liquidityToken.address] ?? curr
			  return memo
			}, {}))
  }
  
  export function isTradeBetter(
	tradeA,
	tradeB,
	minimumDelta = ZERO_PERCENT,
  ) {
	if (tradeA && !tradeB) return false
	if (tradeB && !tradeA) return true
	if (!tradeA || !tradeB) return undefined
  
	if (
	  tradeA.tradeType !== tradeB.tradeType ||
	  !currencyEquals(tradeA.inputAmount.currency, tradeB.inputAmount.currency) ||
	  !currencyEquals(tradeB.outputAmount.currency, tradeB.outputAmount.currency)
	) {
	  throw new Error('Trades are not comparable')
	}
	const ZERO_PERCENT = new Percent('0')
	const ONE_HUNDRED_PERCENT = new Percent('1')

	if (minimumDelta.equalTo(ZERO_PERCENT)) {
	  return tradeA.executionPrice.lessThan(tradeB.executionPrice)
	}
	return tradeA.executionPrice.raw.multiply(minimumDelta.add(ONE_HUNDRED_PERCENT)).lessThan(tradeB.executionPrice)
  }

  export const getBestTrade = (currencyAmountIn, currencyOut,isExactIn) => dispatch =>{
	let allowedPairs = dispatch(getAllCommonPairs(currencyAmountIn?.currency, currencyOut))
	const singleHopOnly = false
	const MAX_HOPS = 3
	if (currencyAmountIn && currencyOut && allowedPairs.length > 0) {
		if(isExactIn){
			if (singleHopOnly) {
			return (
				Trade.bestTradeExactIn(allowedPairs, currencyAmountIn, currencyOut, { maxHops: 1, maxNumResults: 1 })[0] ??
				null
			)
			}
			// search through trades with varying hops, find best trade out of them
			let bestTradeSoFar = null
			for (let i = 1; i <= MAX_HOPS; i++) {
			const currentTrade = Trade.bestTradeExactIn(allowedPairs, currencyAmountIn, currencyOut, { maxHops: i, maxNumResults: 1 })[0] ??
				null
			// if current trade is best yet, save it
				if (isTradeBetter(bestTradeSoFar, currentTrade, BETTER_TRADE_LESS_HOPS_THRESHOLD)) {
					bestTradeSoFar = currentTrade
				}
			}
			return bestTradeSoFar
		}else{
			if (singleHopOnly) {
				return (
					Trade.bestTradeExactOut(allowedPairs, currencyOut,  currencyAmountIn, { maxHops: 1, maxNumResults: 1 })[0] ??
					null
				)
				}
				// search through trades with varying hops, find best trade out of them
				let bestTradeSoFar = null
				for (let i = 1; i <= MAX_HOPS; i++) {
				const currentTrade =
					Trade.bestTradeExactOut(allowedPairs, currencyOut,  currencyAmountIn, { maxHops: i, maxNumResults: 1 })[0] ??
					null
				  if (isTradeBetter(bestTradeSoFar, currentTrade, BETTER_TRADE_LESS_HOPS_THRESHOLD)) {
					bestTradeSoFar = currentTrade
				  }
				}
				return bestTradeSoFar
		}
	}
	return null
  }
  