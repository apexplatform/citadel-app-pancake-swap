import { types } from './types';
import { WalletList } from '../../networking/models/WalletList';
import { ValidationError } from '../../networking/models/Errors';
import { errorActions, usersActions } from './index'
import { getRequest } from '../../networking/requests/getRequest';
import { store } from '../store';
import models from '../../networking/models'
import Wallet from '../../networking/models/Wallet';
import { utils } from '@citadeldao/apps-sdk';

const getWalletConstructor = (address) => {
    try {
        const { activeWallet } = store.getState().wallet
        const currentWallet = address || activeWallet
        const WalletConstructor = models[currentWallet.network.toUpperCase()];
        if(WalletConstructor){
            const wallet = new WalletConstructor(currentWallet);
            return wallet
        }
        return new Wallet(currentWallet)
    } catch {
      new Error("Wallet doesn't exists ");
    }
  };
  

const loadWalletWithBalances = () => async(dispatch) => {
    const walletList = new WalletList()
    walletList.loadWalletsWithBalances().then(wallets => {
        if(wallets instanceof ValidationError){
            dispatch(errorActions.checkErrors(wallets)) 
            stopSplashLoader()
            return
        }
        dispatch({
            type: types.SET_WALLETS,
            payload: wallets
        })
        usersActions.loadUserConfig().then(user_configs =>{
            let flag = false
            wallets?.forEach((item) => {
                if(item.address === user_configs?.lastWalletInfo?.address){  
                    flag = true
                    setTimeout(()=>{
                        dispatch(setActiveWallet(wallets[0],false))
                    },1000) 
                }
                if(!flag){
                    dispatch(setActiveWallet(wallets[0]))
                }
            })
        }).catch(() => {
            dispatch(setActiveWallet(wallets[0]))
            setTimeout(()=>{
                stopSplashLoader()
            },1000) 
        })
    })
}

const loadNetworks = () => async(dispatch) => {
    try{
        const rm = new utils.RequestManager()
        const networks = await rm.send(getRequest('wallet').getNetworks())
        dispatch({
            type: types.SET_NETWORKS,
            payload: networks
        })
    } catch {}
}

const preparePermissionTransfer = async(address,status,minAmount) => {
    const wallet = getWalletConstructor(address);
    let d = new Date();
    let year = d.getFullYear();
    let month = d.getMonth();
    let day = d.getDate();
    let expiryDate = new Date(year + 2, month, day);
    let data = {
        status, expiryDate: expiryDate.toISOString()
      }
    if(+minAmount > 0){
        data.minAmount = +minAmount
    }
    const transaction = await wallet.setPermissionRestake(data);
    wallet.prepareTransfer(transaction.data)
    .then((res) => {
      if (res.ok) {
        return store.dispatch({
          type: types.SET_PREPARE_TRANSFER_RESPONSE,
          payload: { transaction: transaction.data, wallet },
        });
      } else {
        store.dispatch(errorActions.checkErrors(res.data));
      }
    })
    .catch((err) => {
      store.dispatch(errorActions.checkErrors(err));
    });
  };
  
const stopSplashLoader = () => {
    setTimeout(() => {
        document.getElementById('root').style.display = 'block'
        document.getElementById('splash').style.display = 'none'
    }, 3000)
}


const setActiveWallet = (wallet, save = true) => async(dispatch) => {
    dispatch({
        type: types.SET_ACTIVE_WALLET,
        payload: wallet,
    });
    if(save){
        const config = {
            lastWalletInfo: {
                address: wallet.address,
                network: wallet.network
            }
        }
        usersActions.setUserConfig(config)
    }
    await loadTokenBalances(wallet)
}


const loadTokenBalances = async(address) => {
    const wallet = getWalletConstructor(address)
    const { networks } = store.getState().wallet
    if(wallet && networks){
        const balances = await wallet.getAllTokenBalance()
        const tokensSymbols = Object.keys(networks[wallet.net]?.tokens)
        let tokenList = []
        tokensSymbols.forEach(symbol => {
            let balance = 0
            let price = {}
            if(balances.data[symbol]){
                balance = balances.data[symbol]?.amount
                price = balances.data[symbol]?.price
            }
            tokenList.push({ ...networks[wallet.net]?.tokens[symbol], balance, price, network: wallet.net })
        })
        store.dispatch({
            type: types.SET_TOKENS,
            payload: tokenList
        })
        store.dispatch({
            type: types.SET_TOKEN_IN,
            payload: tokenList[0]
        })
        store.dispatch({
            type: types.SET_TOKEN_OUT,
            payload: tokenList[1]
        })
    }

    setTimeout(()=>{
        stopSplashLoader()
    },1000) 
}

export const walletActions = {
    getWalletConstructor,
    loadWalletWithBalances,
    loadNetworks,
    preparePermissionTransfer,
    stopSplashLoader,
    setActiveWallet,
    loadTokenBalances
};