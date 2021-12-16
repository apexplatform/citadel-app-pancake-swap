import {getWalletConstructor, setAmount} from './walletActions'
import {checkErrors} from './errorsActions'
import store from '../store';
import BigNumber from 'bignumber.js';
import { SET_TOKEN_IN, SET_TOKEN_OUT, SET_RATE_AMOUT, SET_SLIPPAGE_TOLERANCE, SET_TRADE, SET_MIN_RECEIVED, SET_SWAP_STATUS, SET_EMPTY_TOKEN_LIST,  SET_PARSED_AMOUNT,SET_PREPARE_TRANSFER_RESPONSE, SET_DEADLINE_MINUTE, SET_FIELD, SET_DISABLE_SWAP, SET_EXACT_IN, SET_PRICE_UPDATED, SET_UPDATED_TRADE, SET_ICON_STATUS } from './types'
import {computeTradePriceBreakdown} from '../../networking/utils/price'
import { setActiveModal } from './panelActions';
export const setRateAmount = (amount) => dispatch =>{
    dispatch({
        type: SET_RATE_AMOUT,
        payload: amount
    })
}
export const setSwapDisable = (status) => dispatch =>{
    dispatch({
        type: SET_DISABLE_SWAP,
        payload: status
    })
}

export const setTrade = (bestTrade) => dispatch =>{
    dispatch({
        type: SET_TRADE,
        payload: bestTrade
    })
}

export const setIndependentField = (bestTrade) => dispatch =>{
    dispatch({
        type: SET_FIELD,
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
    if(wallet){
        dispatch({
            type: SET_EMPTY_TOKEN_LIST,
            payload: []
        })
        await dispatch(wallet.getTokenBalances())
        await dispatch(wallet.getBlockNumber())
    }
}

export const checkTokenAllowance = () => dispatch =>{
    const wallet = getWalletConstructor()
    if(wallet){
        dispatch(wallet.getTokenAllowance())
    }
}

export const getcomputeTradePriceBreakdown = () => dispatch =>{
    const {trade} = store.getState().swapReducer
    return computeTradePriceBreakdown(trade)
}

export const openConfirmModal = (isExactIn) => dispatch => {
    dispatch(setActiveModal('confirm'))
    dispatch({
        type: SET_EXACT_IN,
        payload: isExactIn
    })
    const {amount} = store.getState().walletReducer
    dispatch(updateTradeInfo(amount,isExactIn))
}
export const prepareSwapTransfer  = () => async(dispatch) => {
    const wallet = getWalletConstructor()
    if(wallet){
        dispatch(setSwapDisable(true))
        dispatch(setActiveModal(null))
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
 
}

export const prepareApprove  = () => dispatch => {
    const wallet = getWalletConstructor()
    if(wallet){
        const contractData = {
            address: "0x10ED43C718714eb63d5aA57B78B54704E256024E",
            name: "PancakeSwap: Router v2",
            url: "https://bscscan.com/address/0x10ed43c718714eb63d5aa57b78b54704e256024e"
        }
        const transaction = wallet.generateApproveTransaction(contractData)
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
            dispatch(checkErrors(err))
        })
    }
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

export const updateTradeInfo  = (amount = '0',isExactIn=true,updateCall = false,isConfirm=false) => dispatch => {
    try{
        const wallet = getWalletConstructor()
        if(wallet){
            console.log(amount, '---amount')
            const {fromToken,toToken} = store.getState().walletReducer
            const {swapStatus,trade} = store.getState().swapReducer
            const inputCurrency = wallet.getCurrency(fromToken.address || fromToken.symbol)
            const outputCurrency = wallet.getCurrency(toToken.address || toToken.symbol)
            let parsedAmount = wallet.getParseAmount(amount, isExactIn ? inputCurrency : outputCurrency)
            dispatch(setParsedAmount(parsedAmount))
            const bestTradeExact = dispatch(wallet.getTradeExact(parsedAmount, isExactIn ? outputCurrency : inputCurrency, isExactIn,updateCall))
            console.log(trade?.outputAmount?.toSignificant(6) != bestTradeExact?.outputAmount?.toSignificant(6),+trade?.outputAmount?.toSignificant(6), +bestTradeExact?.outputAmount?.toSignificant(6))
            if(trade && trade?.outputAmount?.toSignificant(6) != bestTradeExact?.outputAmount?.toSignificant(6)){
                dispatch({
                    type: SET_PRICE_UPDATED,
                    payload: true
                })
            }else{
                dispatch({
                    type: SET_PRICE_UPDATED,
                    payload: false
                })
            }
            if(isConfirm){
                if(+trade?.outputAmount?.toSignificant(6) < +bestTradeExact?.outputAmount?.toSignificant(6)){
                    dispatch({
                        type: SET_ICON_STATUS,
                        payload: 'upStatus'
                    })
                }else if(+trade?.outputAmount?.toSignificant(6) > +bestTradeExact?.outputAmount?.toSignificant(6)){
                    dispatch({
                        type: SET_ICON_STATUS,
                        payload: 'downStatus'
                    })
                }else{
                    dispatch({
                        type: SET_ICON_STATUS,
                        payload: 'hideStatus'
                    })
                }
                dispatch({
                    type: SET_UPDATED_TRADE,
                    payload: bestTradeExact
                })
            }else{
                dispatch(setTrade(bestTradeExact))
            }  
            dispatch(setMinReceive(wallet.getMinReceived()))
            dispatch(wallet.getTokenAllowance())
            if(swapStatus === 'approve'){
                setInterval(() => {
                    wallet.getTokenAllowance()
                },10000)
            }
        }
    } catch(err) {
        dispatch(checkErrors(err))
    }
}

export const checkSwapStatus = (amount,setIsactive = () => {},isMax = false,isExactIn=true) => dispatch => {
    const balance = dispatch(getFromBalance())
    const {trade,allowanceAmount,slippageTolerance} = store.getState().swapReducer
    const {fromToken,currentWallet} = store.getState().walletReducer
    const { priceImpactWithoutFee } = dispatch(getcomputeTradePriceBreakdown())
    let feeProcent = currentWallet?.code == fromToken?.symbol ? 0.01 : 0
    if(isMax && !trade){
        dispatch(updateTradeInfo(BigNumber(balance).minus(feeProcent).toFixed(6),isExactIn))
        dispatch(setAmount(BigNumber(balance).minus(feeProcent).toFixed(6)))
        dispatch(checkSwapStatus(BigNumber(balance).minus(feeProcent).toFixed(6),setIsactive))
        return
    }
   // console.log(parseFloat(priceImpactWithoutFee?.toFixed(2)||0) < +slippageTolerance,parseFloat(priceImpactWithoutFee?.toFixed(2)||0) , +slippageTolerance)
    if(+amount > 0) {
        if(+amount > +balance){
            dispatch(setSwapStatus('insufficientBalance'))
        } else if(+amount <= BigNumber(+balance).minus(feeProcent).toNumber()){
                    if(BigNumber(allowanceAmount).div(BigNumber(Math.pow(10,+fromToken.decimals))).toNumber() > +amount || fromToken.symbol === 'BNB'){
                        if(parseFloat(priceImpactWithoutFee?.toFixed(2)||0) < +slippageTolerance){
                            dispatch(setSwapStatus('swap'))
                        }else{
                            dispatch(setSwapStatus('swapAnyway'))
                        }
                    } else {
                        setIsactive(true)
                        dispatch(setSwapStatus('approve'))
                    }
                } else {
                    dispatch(setSwapStatus('feeError'))
                    dispatch(checkSwapStatus(BigNumber(+balance).minus(feeProcent).toFixed(),setIsactive))
                }
    } else {
        dispatch(setSwapStatus('enterAmount'))
    }
    
}

export const getFromBalance = () => dispatch =>  {
    const {fromToken,currentWallet} = store.getState().walletReducer
 //   if(fromToken.symbol === 'BNB') return currentWallet?.balance?.mainBalance
    if(fromToken.balance) return fromToken.balance
    return 0
}