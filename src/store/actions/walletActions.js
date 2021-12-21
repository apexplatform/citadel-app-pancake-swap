import {SET_PREPARE_TRANSFER_RESPONSE,SET_AMOUNT,SET_FROM_TOKEN,SET_TO_TOKEN, SET_FROM_TOKEN_AMOUNT, SET_TO_AMOUNT, SET_TO_ADDRESS,SET_CURRENT_WALLET,SET_EMPTY_TOKEN_LIST, SET_TOKEN, SET_NETWORKS, SET_WALLETS, SET_INITIAL_LOAD} from './types'
import models from '../../networking/models';
import store from '../store';
import {ValidationError} from '../../networking/models/Errors'
import {checkErrors} from './errorsActions'
import {getTokenBalance,checkTokenAllowance, updateTradeInfo,setSwapDisable} from './swapActions'
import axios from 'axios';
import { WalletList } from '../../networking/models/WalletList';
import { setLoader } from './panelActions';
export const setCurrentWallet = (wallet) => dispatch =>{
    dispatch(setLoader(false))
    dispatch({
        type: SET_CURRENT_WALLET,
        payload: wallet
    })
    dispatch(getTokenBalance(true))
}

export const setToAddress = (address) => dispatch =>{
    dispatch({
        type: SET_TO_ADDRESS,
        payload: address
    })
}


export const setAmount = (amount) => dispatch =>{
    dispatch({
        type: SET_AMOUNT,
        payload: amount
    })
    dispatch({
        type: SET_INITIAL_LOAD,
        payload: false
    })
}

export const setSelectedToken = (token) => dispatch =>{
    const {loader} = store.getState().panelReducer
    if(token === 'from' && loader) dispatch(getTokenBalance())
    dispatch(setSwapDisable(false))
    dispatch({
        type: SET_TOKEN,
        payload: token
    })
}

export const setFromToken = (token) => dispatch =>{
    const {amount} = store.getState().walletReducer
    dispatch({
        type: SET_FROM_TOKEN,
        payload: token
    })
    dispatch(checkTokenAllowance())
    dispatch(updateTradeInfo(amount,true))
}

export const setToToken = (token) => dispatch =>{
    const {toTokenAmount} = store.getState().walletReducer
    dispatch({
        type: SET_TO_TOKEN,
        payload: token
    })
    dispatch(updateTradeInfo(toTokenAmount,false))
}

export const setFromAmount = (balance) => dispatch =>{
    dispatch({
        type: SET_FROM_TOKEN_AMOUNT,
        payload: balance
    })
}

export const setToAmount= (amount) => dispatch =>{
    dispatch({
        type: SET_TO_AMOUNT,
        payload: amount
    })
}
export const getCurrentWallet  = () => {
    const {currentWallet} = store.getState().walletReducer;
    return currentWallet
}

export const getWalletConstructor = (address) =>  {
    try{
        const currentWallet = address || getCurrentWallet()
        const WalletConstructor = models[currentWallet.network.toUpperCase()];
        const wallet = new WalletConstructor(currentWallet)
        return wallet
    }catch{
        new Error("Wallet doesn't exists ")
    }
}

export const prepareTransfer  = () => dispatch => {
    const wallet = getWalletConstructor()
    const transaction = wallet.generateBaseTransaction()
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

export const loadWalletWithBalances  = () => dispatch => {
    const walletList = new WalletList()
    const wallets = walletList.getWallets()
    if(wallets instanceof ValidationError){
        dispatch(checkErrors(wallets)) 
        return
    }
    if(wallets.length > 0){
        wallets.forEach(async item => {
            const wallet = getWalletConstructor(item)
            if(wallet){
                let response = await wallet.getWalletBalance()
                if(response.ok){
                    item.balance = response.data
                }else{
                    dispatch(checkErrors(response))
                }
            } 
        })
        dispatch ({
            type:SET_WALLETS,
            payload: wallets
        })
        dispatch ({
            type:SET_CURRENT_WALLET,
            payload: wallets[0]
        })
    }
    dispatch(setLoader(true))
}

export const loadNetworks = () => dispatch =>{
    try{
        axios.get('https://app.citadel.one/api/networks.json').then(res => (
            dispatch({
                type: SET_NETWORKS,
                payload: res.data
            })
        ))
    } catch {}
}
