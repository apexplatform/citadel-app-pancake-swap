import {getWalletConstructor} from './walletActions'
import {checkErrors} from './errorsActions'
import store from '../store';
import { SET_TOKEN_IN, SET_TOKEN_OUT, SET_RATE_AMOUT, SET_SLIPPAGE_TOLERANCE, SET_TRADE, SET_MIN_RECEIVED, SET_SWAP_STATUS, SET_DEADLINE,  SET_PARSED_AMOUNT,SET_PREPARE_TRANSFER_RESPONSE } from './types'
export const setRateAmount = (amount) => dispatch =>{
    dispatch({
        type: SET_RATE_AMOUT,
        payload: amount
    })
}

export const setTrade = (bestTrade) => dispatch =>{
    dispatch({
        type: SET_TRADE,
        payload: bestTrade
    })
}

export const setParsedAmount = (amount) => dispatch =>{
    dispatch({
        type: SET_PARSED_AMOUNT,
        payload: amount
    })
}


export const setDeadline = (min) => dispatch =>{
    dispatch({
        type: SET_DEADLINE,
        payload: min
    })
}

export const setSwapStatus = (status) => dispatch =>{
    dispatch({
        type: SET_SWAP_STATUS,
        payload: status
    })
}

export const setMinReceive = (amount) => dispatch =>{
    dispatch({
        type: SET_MIN_RECEIVED,
        payload: amount
    })
}

export const setSlippageTolerance = (procent) => dispatch =>{
    dispatch({
        type: SET_SLIPPAGE_TOLERANCE,
        payload: procent
    })
}

export const getTokenBalance = () => dispatch =>{
    const {fromToken} = store.getState().walletReducer
    const wallet = getWalletConstructor()
    dispatch(wallet.getTokenBalance(fromToken.address))
    dispatch(wallet.getBlockNumber())
}

export const checkTokenAllowance = () => dispatch =>{
    const wallet = getWalletConstructor()
    dispatch(wallet.getTokenAllowance())
}

export const prepareSwapTransfer  = () => dispatch => {
    const wallet = getWalletConstructor()
    dispatch(wallet.getBlockNumber())
    const transaction = wallet.generateSwapTransaction()
    console.log(JSON.stringify(transaction,null,2))
    wallet.prepareTransfer(transaction).then((ok, data) => {
        if(ok){
            return dispatch ({
                type:SET_PREPARE_TRANSFER_RESPONSE,
                payload: data
            })
        }else{
            dispatch(checkErrors(data))
        }
    }).catch(err => {
             console.log(err)
        dispatch(checkErrors(err))
    })
}

export const prepareApprove  = () => dispatch => {
    const wallet = getWalletConstructor()
   // await dispatch(wallet.getGasPrice())
    const transaction = wallet.generateApproveTransaction()
    console.log(JSON.stringify(transaction,null,2))
    wallet.prepareTransfer(transaction).then((ok, data) => {
        if(ok){
            return dispatch ({
                type:SET_PREPARE_TRANSFER_RESPONSE,
                payload: data
            })
        }else{
            dispatch(checkErrors(data.error))
        }
    }).catch(err => {
        console.log(err)
        dispatch(checkErrors(err))
    })
}

export const swapTokens = () => dispatch =>{
    const tokenIn = store.getState().swapReducer.tokenIn
    const tokenOut = store.getState().swapReducer.tokenOut
    dispatch({
        type: SET_TOKEN_IN,
        payload: tokenOut
    })
    dispatch({
        type: SET_TOKEN_OUT,
        payload: tokenIn
    })
}

export const updateTradeInfo  = (amount = '0',isExactIn=true) => dispatch => {
    try{
        console.log(amount,'--amount')
        const wallet = getWalletConstructor()
        const {fromToken,toToken} = store.getState().walletReducer
        const inputCurrency = wallet.getCurrency(fromToken.address)
        const outputCurrency = wallet.getCurrency(toToken.address)
        let parsedAmount = wallet.getParseAmount(amount, isExactIn ? inputCurrency : outputCurrency)
        dispatch(setParsedAmount(parsedAmount))
        const bestTradeExact = dispatch(wallet.getTradeExact(parsedAmount, isExactIn ? outputCurrency : inputCurrency, isExactIn))
        if(!bestTradeExact?.outputAmount) updateTradeInfo(amount)
        dispatch(setTrade(bestTradeExact))
        dispatch(setMinReceive(wallet.getMinReceived()))
        console.log(bestTradeExact,'--bestTradeExactIn')
        dispatch(wallet.getTokenAllowance())
    } catch(err) {
        dispatch(checkErrors(err))
        console.log(err)
    }
}