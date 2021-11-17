import { CurrencyAmount,currencyEquals, Currency, JSBI, Percent,Token,Pair, TokenAmount, Trade } from '@pancakeswap/sdk'
import BigNumber from 'bignumber.js';
import { parseUnits } from '@ethersproject/units'
import { wrappedCurrency } from './wrappedCurrency'
import store from '../../store/store';
import {isValidMethodArgs,toCallState,PairState} from './multicalHooks'
import flatMap from 'lodash/flatMap'
import { Interface } from '@ethersproject/abi'
import { useTokenContract , useMulticallContract} from './contractHooks'
import { abi as IUniswapV2PairABI } from '@uniswap/v2-core/build/IUniswapV2Pair.json'
import {
	BASES_TO_CHECK_TRADES_AGAINST,
	CUSTOM_BASES,
	BETTER_TRADE_LESS_HOPS_THRESHOLD,
	ADDITIONAL_BASES,
  } from '../constants/constants.js'
  import { ADD_MULTICAL_LISTENERS,REMOVE_MULTICAL_LISTENERS,SET_DEADLINE, SET_CALLS, SET_TOKEN_LIST, SET_LOADER, SET_TO_TOKEN, SET_FROM_TOKEN, SET_EMPTY_TOKEN_LIST} from "../../store/actions/types"
import tokens from '../constants/tokenLists/pancake-default.tokenlist.json'
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
  
export const useCallsData = (calls, options) => dispatch =>{
	const chainId  = 56
	const serializedCallKeys = JSON.stringify(
		  calls?.map(toCallKey)?.sort() ?? [],
		)
	const callKeys = JSON.parse(serializedCallKeys)
	if (!chainId || callKeys.length === 0) return undefined
	const call = callKeys.map((key) => parseCallKey(key))
	dispatch({type:ADD_MULTICAL_LISTENERS,payload: {chainId,call,options}})
	const callResults = store.getState().multicalReducer.callResults
	dispatch({type:REMOVE_MULTICAL_LISTENERS,payload: {chainId,calls,options}})
	return calls?.map((call) => {
		  if (!chainId || !call) return INVALID_RESULT
		  const result = callResults[chainId]?.[toCallKey(call)]
		  let data
		  if (result?.data && result?.data !== '0x') {
			// eslint-disable-next-line prefer-destructuring
			data = result.data
		  }
		  return { valid: true, data, blockNumber: result?.blockNumber }
		})
  }

export function tryParseAmount(value, currency) {
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
	  // should fail if the user specifies too many decimal places of precision (or maybe exceed max uint?)
	  console.debug(`Failed to parse input amount: "${value}"`, error)
	}
	// necessary for all paths to return a value
	return undefined
  }
  export const useBlock = () => {
	return store.getState().blockReducer
  }

  export const useMultipleContractSingleData = (addresses, contractInterface,methodName,callInputs,options) => dispatch => {
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
	dispatch({type:SET_CALLS,payload: {chainId: 56,calls}})
	const results = dispatch(useCallsData(calls, options))
	const { currentBlock } = useBlock()
	return results.map((result) => toCallState(result, contractInterface, fragment, currentBlock))
  }
  
  export const usePairs = (currencies) => dispatch => {
	const chainId = 56
	const tokens = currencies.map(([currencyA, currencyB]) => [
		  wrappedCurrency(currencyA, chainId),
		  wrappedCurrency(currencyB, chainId),
		])
	const pairAddresses = tokens.map(([tokenA, tokenB]) => {
		  return tokenA && tokenB && !tokenA.equals(tokenB) ? Pair.getAddress(tokenA, tokenB) : undefined
		})
	const PAIR_INTERFACE = new Interface(IUniswapV2PairABI)
	const results = dispatch(useMultipleContractSingleData(pairAddresses, PAIR_INTERFACE, 'getReserves'))
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
  
  const useAllCommonPairs = (currencyA, currencyB) => dispatch => {
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
	const allPairs = dispatch(usePairs(allPairCombinations))
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

  export const useTradeExact = (currencyAmountIn, currencyOut,isExactIn) => dispatch =>{
	const allowedPairs = dispatch(useAllCommonPairs(currencyAmountIn?.currency, currencyOut))
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
  
  export const loadBlockNumber = () => dispatch => {
	const {deadlineMin} = store.getState().swapReducer
	const contract = useMulticallContract()
	contract?.getCurrentBlockTimestamp().then((returnData) => {
	  dispatch({
		type: SET_DEADLINE,
		payload: parseInt(returnData?._hex, 16) + (+deadlineMin * 60)
	  })
	})
  }
  
  export const loadTokenBalances = () => async(dispatch) => {
	const {currentWallet,fromToken,toToken} = store.getState().walletReducer
	let list = [{...Currency.ETHER,symbol: 'BNB', logoURI: "https://pancakeswap.finance/images/tokens/0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c.png"}, ...tokens['tokens']]
	dispatch({
		type: SET_EMPTY_TOKEN_LIST,
		payload: []
	})
	list.forEach(async(token) =>{
		if(token.address){
			const contract = useTokenContract(token.address)
			let balance = await contract?.balanceOf(currentWallet?.address)
				if(token.symbol === toToken.symbol){
					dispatch({
						type: SET_TO_TOKEN,
						payload: {...token,balance: parseInt(balance?._hex,16)/Math.pow(10,+token.decimals)}
					})  
				}
				if(token.symbol === fromToken.symbol){
					dispatch({
						type: SET_FROM_TOKEN,
						payload: {...token,balance: parseInt(balance?._hex,16)/Math.pow(10,+token.decimals)}
					})  
				}
			dispatch({
				type: SET_TOKEN_LIST,
				payload: {...token,balance: parseInt(balance?._hex,16)/Math.pow(10,+token.decimals)}
			})
		} else {
			dispatch({
				type: SET_TOKEN_LIST,
				payload: {...token,balance: currentWallet?.balance?.mainBalance || 0}
			})
		}
		
	})
	dispatch({
        type: SET_LOADER,
        payload: true
    })
  }