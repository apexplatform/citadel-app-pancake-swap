import {getWalletConstructor} from './walletActions'
import {checkErrors} from './errorsActions'
import axios from 'axios';
import {DecUtils, Dec, IntPretty } from '@keplr-wallet/unit';
import store from '../store';
import { SET_POOL_INFO, SET_SWAP_RATE, SET_TOKEN_IN, SET_TOKEN_OUT,SET_SLIPPAGE, SET_POOL_ID, SET_INITIAL_RATE } from './types'
import {calcOutGivenIn, calcSpotPrice} from '../utils/math'
import {setPopout} from './panelActions'
import {ScreenSpinner} from '@vkontakte/vkui';
import {makeIBCMinimalDenom} from '../utils/ibc'
export const prepareSwapTransfer  = () => dispatch => {
    const wallet = getWalletConstructor()
    const transaction = wallet.generateSwapTransaction()
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

export const swapTokens = (fromTokenAmount) => dispatch =>{
    dispatch(setPopout(<ScreenSpinner size='large' />))
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
    dispatch(calculateSpotPriceWithoutSwapFee(false))
    dispatch(calculateSlippage(fromTokenAmount))
}

export const loadPoolInfo = () => dispatch =>{
    try{
        const {poolId} = store.getState().swapReducer
        const {fromToken} = store.getState().walletReducer
        axios.get('https://lcd-osmosis.keplr.app/osmosis/gamm/v1beta1/pools/' + poolId).then(res => {
            dispatch({
                type: SET_POOL_INFO,
                payload: res.data?.pool
            })
            res.data?.pool?.poolAssets?.map(pool => {
                if(pool.token?.denom === fromToken?.denom){
                    dispatch({
                        type: SET_TOKEN_IN,
                        payload: pool || null
                    })
                } else {
                    dispatch({
                        type: SET_TOKEN_OUT,
                        payload: pool || null
                    })
                }       
            })  
            dispatch(calculateSpotPriceWithoutSwapFee())
        })
    } catch (e) {
        console.log(e)
    }
}


export const calculateSlippage = (tokenInAmount) => dispatch => {
    try{
        const tokenWeightIn = new Dec(store.getState().swapReducer.tokenIn?.weight)
        const tokenWeightOut = new Dec(store.getState().swapReducer.tokenOut?.weight)
        const tokenBalanceIn = new Dec(store.getState().swapReducer.tokenIn?.token.amount)
        const tokenBalanceOut = new Dec(store.getState().swapReducer.tokenOut?.token.amount)
        const amount = new Dec(tokenInAmount).mul(DecUtils.getPrecisionDec(6)).truncate();
        const tokenOutAmount = calcOutGivenIn(tokenBalanceIn,tokenWeightIn,tokenBalanceOut,tokenWeightOut,amount,new Dec('0'))
        const effectivePrice = new Dec(amount).quo(tokenOutAmount);
        const spotPriceBefore = calcSpotPrice(tokenBalanceIn,tokenWeightIn,tokenBalanceOut,tokenWeightOut,new Dec(0))
		const slippage = effectivePrice.quo(spotPriceBefore).sub(new Dec('1'));
        dispatch({
            type: SET_SLIPPAGE,
            payload: new IntPretty(slippage).decreasePrecision(2).maxDecimals(3).trim(true).toString()
        })
    }catch{
        return 0
    }
   
}


export const calculateSpotPriceWithoutSwapFee = (initial=true) => dispatch => {
    try{
        const tokenWeightIn = new Dec(store.getState().swapReducer.tokenIn?.weight)
        const tokenWeightOut = new Dec(store.getState().swapReducer.tokenOut?.weight)
        const tokenBalanceIn = new Dec(store.getState().swapReducer.tokenIn?.token?.amount)
        const tokenBalanceOut = new Dec(store.getState().swapReducer.tokenOut?.token?.amount)
        const outSpotPrice = calcSpotPrice(tokenBalanceIn,tokenWeightIn,tokenBalanceOut,tokenWeightOut,new Dec(0))
        const inSpotPrice = outSpotPrice.equals(new Dec(0)) ? outSpotPrice
        : new IntPretty(new Dec(1).quo(outSpotPrice))
        dispatch(setPopout(null))
        initial && dispatch({
            type: SET_INITIAL_RATE,
            payload: inSpotPrice.maxDecimals(3).trim(true).toString()
        })
        return dispatch({
            type: SET_SWAP_RATE,
            payload: inSpotPrice.maxDecimals(3).trim(true).toString()
        })
    }catch {
        return 1
    }
   
}



export const setInPool = (token) => dispatch => {
    try{
        dispatch(setPopout(<ScreenSpinner size='large' />))
        const {pools} = store.getState().swapReducer
        const {toToken} = store.getState().walletReducer
        const inPools = []
        const outPools = []
        pools.map(pool => {
            pool.currencies.map(item => {
                if(item.coinMinimalDenom === token.denom){
                    inPools.push(pool)
                }
            })
        })
        if(inPools.length){
            inPools.map(pool =>{
                pool.currencies.map(item => {
                    if(item.coinMinimalDenom === toToken.denom){
                        outPools.push(pool)
                    }
                })
            })
        } else {
            console.warn('Token is not supported!')
        }
        if(outPools.length === 1){
            dispatch({
                type: SET_POOL_ID,
                payload: outPools[0].poolId
            })
        } else if(outPools.length > 1){
            dispatch({
                type: SET_POOL_ID,
                payload: outPools[0].poolId
            })
        }
        dispatch(loadPoolInfo())
    }catch {
        return 1
    }
}


export const setOutPool = (token) => dispatch => {
    try{
        dispatch(setPopout(<ScreenSpinner size='large' />))
        const {pools} = store.getState().swapReducer
        const {fromToken} = store.getState().walletReducer
        const inPools = []
        const outPools = []
        pools.map(pool => {
            pool.currencies.map(item => {
                if(item.coinMinimalDenom === token.denom){
                    outPools.push(pool)
                }
            })
        })
        if(outPools.length){
            outPools.map(pool =>{
                pool.currencies.map(item => {
                    if(item.coinMinimalDenom === fromToken.denom){
                        inPools.push(pool)
                    }
                })
            })
        } else {
            console.warn('Token is not supported!')
        }
        if(inPools.length === 1){
            dispatch({
                type: SET_POOL_ID,
                payload: inPools[0].poolId
            })
        } else if(inPools.length > 1){
            dispatch({
                type: SET_POOL_ID,
                payload: inPools[0].poolId
            })
        }
        dispatch(loadPoolInfo())
    }catch {
        return 1
    }
}