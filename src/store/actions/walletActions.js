import {SET_PREPARE_TRANSFER_RESPONSE,SET_WALLETS,SET_AMOUNT,SET_FROM_TOKEN,SET_TO_TOKEN, SET_FROM_AMOUNT, SET_TO_AMOUNT, SET_TO_ADDRESS,SET_CURRENT_WALLET, SET_TOKEN, SET_NETWORKS} from './types'
import models from '../../networking/models';
import store from '../store';
import {checkErrors} from './errorsActions'
import axios from 'axios';
import {ValidationError} from '../../networking/models/Errors'
import {WalletList} from '../../networking/models/WalletList'
export const setCurrentWallet = (wallet) => dispatch =>{
    dispatch({
        type: SET_CURRENT_WALLET,
        payload: wallet
    })
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
}

export const setSelectedToken = (token) => dispatch =>{
    dispatch({
        type: SET_TOKEN,
        payload: token
    })
}

export const setFromToken = (token) => dispatch =>{
    dispatch({
        type: SET_FROM_TOKEN,
        payload: token
    })
}

export const setToToken = (token) => dispatch =>{
    dispatch({
        type: SET_TO_TOKEN,
        payload: token
    })
}

export const setFromAmount= (amount) => dispatch =>{
    dispatch({
        type: SET_FROM_AMOUNT,
        payload: amount
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
        if(wallet){
            return wallet
        }
        return undefined
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
    if(wallets.length){
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
