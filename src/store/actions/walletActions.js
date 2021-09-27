import {SET_PREPARE_TRANSFER_RESPONSE,SET_AMOUNT,SET_FROM_TOKEN,SET_TO_TOKEN, SET_FROM_AMOUNT, SET_TO_AMOUNT, SET_TO_ADDRESS,SET_CURRENT_WALLET, SET_TOKEN, SET_NETWORKS} from './types'
import models from '../../networking/models';
import store from '../store';
import {checkErrors} from './errorsActions'
import axios from 'axios';
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
export const generateTransaction = () => {
    const {auth_token} = store.getState().userReducer
    const {currentWallet,toAddress,amount} = store.getState().walletReducer;
    const body =
	{
		"from": currentWallet.address,
		"toAddress": toAddress,
		"amount": amount,
		"network": currentWallet.network,
		"publicKey": currentWallet.publicKey,
		"fee": "0.0001575",
		"gasPrice": "5000000000",
		"token": auth_token
	}
    return body
}

export const getCurrentWallet  = () => {
    const {currentWallet} = store.getState().walletReducer;
    return currentWallet
}

export const getWalletConstructor = () =>  {
    try{
        const currentWallet = getCurrentWallet()
        const WalletConstructor = models[currentWallet.network.toUpperCase()];
        const wallet = new WalletConstructor(currentWallet)
        return wallet
    }catch{
        new Error("Wallet doesn't exists ")
    }
}

export const prepareTransfer  = () => dispatch => {
    const wallet = getWalletConstructor()
    const transaction = generateTransaction()
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