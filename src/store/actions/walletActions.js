import { types } from './types';
import { WalletList } from '../../networking/models/WalletList';
import { ValidationError } from '../../networking/models/Errors';
import { errorActions, usersActions, swapActions } from './index'
import { getRequest } from '../../networking/requests/getRequest';
import { store } from '../store';
import models from '../../networking/models'
import Wallet from '../../networking/models/Wallet';
import { utils } from '@citadeldao/apps-sdk';
import BigNumber from 'bignumber.js'
import axios from 'axios';

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
        console.log(wallets)
        if(wallets instanceof ValidationError){
            dispatch(errorActions.checkErrors(wallets)) 
            stopSplashLoader()
            return
        }
        dispatch({
            type: types.SET_WALLETS,
            payload: wallets
        })
        axios.get('https://rest.coinapi.io/v1/assets/BNB?apikey=29F44911-083E-4782-AFF1-E7E9E91A9170').then((res) =>{
            dispatch({
                type: types.SET_USD_PRICE,
                payload: res.data[0]?.price_usd
            })
        })
        usersActions.loadUserConfig().then(user_configs =>{
            let flag = false
            wallets?.forEach((item) => {
                if(item.address === user_configs?.lastWalletInfo?.address){  
                    flag = true
                    setTimeout(()=>{
                        dispatch(setActiveWallet(item, false))
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


const setActiveWallet = (wallet, save = true) => (dispatch) => {
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
    loadTokenBalances(wallet)
}

const formatBalance = (hex,decimals) => {
    if(hex === '0x00'){
        return '0'
    }else{
		let balance = '0.0'
		if(typeof hex == 'number'){
			balance = hex.toString()
		}else{
			balance = BigNumber(parseInt(hex,16)/Math.pow(10,decimals)).toString()
		}
		if(balance.includes('e')){
			balance = BigNumber(balance).toFixed(10).replace(/\.?0+$/,"")
            if(balance.substring(0,8) === '0.000000') return '~0'
			return balance
		}
		if(balance.length < 8){
			return balance
		}
		let balanceArr = balance.split('.')
		if(balanceArr[1]?.length > 6){
			balanceArr[1] = balanceArr[1].substring(0,6)
		}
		return balanceArr[0] + '.' + balanceArr[1]
	}
}

const loadTokenBalances = (address) => {
    const wallet = getWalletConstructor(address)
    const { tokens } = store.getState().wallet;
    const { tokenIn, tokenOut, amount, isExactIn } = store.getState().swap;
    tokens.forEach(async(token) => {
        if(token?.address){
            let balance = await wallet.getTokenBalance(token)
            if(balance){
                token.balance = formatBalance(balance?._hex,+token.decimals)
            }
            if(token.symbol === tokenIn.symbol){	
                let allowance = await wallet.loadTokenAllowance(token)
                store.dispatch({
                    type: types.SET_ALLOWANCE,
                    payload: allowance,
                });
                store.dispatch({
                    type: types.SET_TOKEN_IN,
                    payload: {...token,balance: formatBalance(balance?._hex,+token.decimals)}
                })  
            }
            if(token.symbol === tokenOut.symbol){
                store.dispatch({
                    type: types.SET_TOKEN_OUT,
                    payload: {...token,balance: formatBalance(balance?._hex,+token.decimals)}
                })  
            }
        }else{
            token.balance = formatBalance(address?.balance, 6)
        }
    })
    store.dispatch(swapActions.getSwapInfo(amount, isExactIn, false))
    setTimeout(()=>{
        stopSplashLoader()
    },1000) 
}

const updateWalletList = async(wallet) => {
    let { wallets, activeWallet, networks } = store.getState().wallet
    let metaMaskWallet = wallets && wallets.find(elem => elem.from === 'metamask')
    if(metaMaskWallet){
        let updateActiveWallet = false
        if(metaMaskWallet.network === wallet.net && wallet.address){
            if(metaMaskWallet.address === activeWallet.address){
                updateActiveWallet = true
            }
            metaMaskWallet.address = wallet.address
            const walletInstance = getWalletConstructor(metaMaskWallet)
            const response = await walletInstance.getWalletBalance()
            metaMaskWallet.balance = response.data.mainBalance
            if(updateActiveWallet){
                store.dispatch(setActiveWallet(metaMaskWallet))
            }
        }else{
            wallets = wallets.filter(elem => elem.from !== 'metamask')
        }
    }else{
        const walletList = new WalletList()
        wallet.network = wallet.net
        wallet.name = networks[wallet?.net]?.name
        wallet.code = networks[wallet?.net]?.code
        wallet.decimals = networks[wallet?.net]?.decimals
        wallet.from = 'metamask'
        wallet.getTxUrl = walletList.getTxUrl(wallet?.net)
        const walletInstance = getWalletConstructor(wallet)
        const response = await walletInstance.getWalletBalance()
        wallet.balance = response.data.mainBalance
        wallets = wallets.concat([wallet])
        store.dispatch(errorActions.clearErrors())
    }
    store.dispatch({
        type: types.SET_WALLETS,
        payload: wallets
    })
}

export const walletActions = {
    getWalletConstructor,
    loadWalletWithBalances,
    loadNetworks,
    preparePermissionTransfer,
    stopSplashLoader,
    setActiveWallet,
    loadTokenBalances,
    formatBalance,
    updateWalletList
};