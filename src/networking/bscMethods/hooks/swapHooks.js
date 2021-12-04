import { CurrencyAmount, Currency, JSBI,Token,TokenAmount} from '@pancakeswap/sdk'
import { parseUnits } from '@ethersproject/units'
import store from '../../../store/store';
import { useTokenContract , useMulticallContract} from './contractHooks'

  import { SET_DEADLINE, SET_TOKEN_LIST, SET_LOADER, SET_TO_TOKEN, SET_FROM_TOKEN, SET_EMPTY_TOKEN_LIST} from "../../../store/actions/types"
import tokens from '../constants/tokenLists/pancake-default.tokenlist.json'

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

  export const loadBlockNumber = () => async(dispatch) => {
	const {deadlineMin} = store.getState().swapReducer
	const contract = useMulticallContract()
	await contract?.getCurrentBlockTimestamp().then((returnData) => {
	  dispatch({
		type: SET_DEADLINE,
		payload: parseInt(returnData?._hex, 16) + (+deadlineMin * 60)
	  })
	})
  }
  
  export const loadTokenBalances = () => dispatch => {
	const {currentWallet,fromToken,toToken} = store.getState().walletReducer
	let list = [{...Currency.ETHER,symbol: 'BNB', logoURI: "https://pancakeswap.finance/images/tokens/0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c.png"}, ...tokens['tokens']]
	dispatch({
		type: SET_EMPTY_TOKEN_LIST,
		payload: []
	})
	list.forEach(async(token) =>{
		if(token?.address){
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