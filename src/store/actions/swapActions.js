import {getWalletConstructor, setAmount,setToAmount} from './walletActions'
import {checkErrors} from './errorsActions'
import store from '../store';
import BigNumber from 'bignumber.js';
import {computeTradePriceBreakdown} from '../../networking/utils/price'
import { SET_TOKEN_IN, SET_TOKEN_OUT, SET_RATE_AMOUT, SET_SLIPPAGE_TOLERANCE, SET_TRADE, SET_MIN_RECEIVED, SET_SWAP_STATUS, SET_EMPTY_TOKEN_LIST,  SET_PARSED_AMOUNT,SET_PREPARE_TRANSFER_RESPONSE, SET_DEADLINE_MINUTE, SET_FIELD, SET_TIMER_APPROVE } from './types'
export const setRateAmount = (amount) => dispatch =>{
    dispatch({
        type: SET_RATE_AMOUT,
        payload: amount
    })
}
export const setIndependentField = (field) => dispatch => {
    dispatch({
        type: SET_FIELD,
        payload: field
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
        type: SET_DEADLINE_MINUTE,
        payload: min
    })
}

export const setSwapStatus = (status) => dispatch =>{
    dispatch({
        type: SET_SWAP_STATUS,
        payload: status
    })
}

export const setTimerApprove = (status) => dispatch =>{
    dispatch({
        type: SET_TIMER_APPROVE,
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

export const getTokenBalance = () => async(dispatch) =>{
    const wallet = getWalletConstructor()
    dispatch(wallet.getBlockNumber())
    dispatch({
        type: SET_EMPTY_TOKEN_LIST,
        payload: []
    })
    await dispatch(wallet.getTokenBalances())
}

export const checkTokenAllowance = () => dispatch =>{
    const wallet = getWalletConstructor()
    dispatch(wallet.getTokenAllowance())
}

export const prepareSwapTransfer  = () => async(dispatch) => {
    const wallet = getWalletConstructor()
    await dispatch(wallet.getBlockNumber())
    const transaction = wallet.generateSwapTransaction()
    wallet.prepareTransfer(transaction).then((response) => {
        if(response?.ok){
            return dispatch ({
                type:SET_PREPARE_TRANSFER_RESPONSE,
                payload: data
            })
        }else{
            dispatch(checkErrors(response))
        }
    }).catch(err => {
        dispatch(checkErrors(err))
    })
}

export const prepareApprove  = () => dispatch => {
    const wallet = getWalletConstructor()
    const transaction = wallet.generateApproveTransaction()
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

export const updateTradeInfo  = (amount = '0',isExactIn=true) => async dispatch => {
    try{
        const wallet = getWalletConstructor()
        if(wallet){
            console.log(amount,'--amount',isExactIn)
            const {fromToken,toToken} = store.getState().walletReducer
            const {swapStatus} = store.getState().swapReducer
            const inputCurrency = wallet.getCurrency(fromToken.address || fromToken.symbol)
            const outputCurrency = wallet.getCurrency(toToken.address || toToken.symbol)
            let parsedAmount = wallet.getParseAmount(amount, isExactIn ? inputCurrency : outputCurrency)
            dispatch(setParsedAmount(parsedAmount))
            const bestTradeExact = await dispatch(wallet.getTradeExact(parsedAmount, isExactIn ? outputCurrency : inputCurrency, isExactIn))
            // if(!bestTradeExact?.outputAmount) updateTradeInfo(amount)
            dispatch(setTrade(bestTradeExact))
            dispatch(setMinReceive(wallet.getMinReceived()))
            console.log(bestTradeExact,'--bestTradeExactIn')
            dispatch(wallet.getTokenAllowance())
            if(swapStatus === 'approve'){
                setInterval(() => {
                    wallet.getTokenAllowance()
                },10000)
            }
        }
    } catch(err) {
        dispatch(checkErrors(err))
        console.log(err)
    }
}


export const checkAmount = (val,name) => dispatch => {
    const {currentWallet,fromToken,toToken} = store.getState().walletReducer
    const {allowanceAmount,slippageTolerance,trade} = store.getState().swapReducer
    dispatch(setAmount(val))
    dispatch(setIndependentField(name))
    let { priceImpactWithoutFee, realizedLPFee } = computeTradePriceBreakdown(trade)
    const feeProcent = realizedLPFee?.toSignificant(4) || 0.001
    const outputAmount = trade?.outputAmount?.toExact() || 0
    let balance = 0
    if(fromToken.symbol === 'BNB') balance = currentWallet?.balance?.mainBalance
    if(name === 'INPUT' && fromToken.balance) balance = fromToken.balance
    if(name === 'OUTPUT' && toToken.balance) balance = toToken.balance
   // props.setExactIn(props.name === 'INPUT' ? true : false)
    if(+val > 0){
        dispatch(updateTradeInfo(val, name === 'INPUT' ? true : false))
        dispatch(setToAmount(outputAmount))
        if(parseInt(val) > balance){
            dispatch(setSwapStatus('insufficientBalance'))
        }
        else if(parseInt(val) < +balance - feeProcent){
            if(BigNumber(allowanceAmount).div(BigNumber(Math.pow(10,+fromToken.decimals))).toNumber() > parseInt(val) || fromToken.symbol === 'BNB'){
                if(parseFloat(priceImpactWithoutFee?.toFixed(2)||0) < +slippageTolerance){
                    dispatch(setSwapStatus('swap'))
                }else{
                    dispatch(setSwapStatus('swapAnyway'))
                }
            } else {
                dispatch(setTimerApprove(true))
                dispatch(setSwapStatus('approve'))
            }
        } else {
            dispatch(setSwapStatus('feeError'))
        }
    } else {
        dispatch(setSwapStatus('enterAmount'))
    }
}