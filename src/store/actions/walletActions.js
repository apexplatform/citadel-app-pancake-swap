import WalletConstructor from '../../networking/models';
import { types } from './types';
import { WalletList } from '../../networking/models/WalletList';
import { ValidationError } from '../../networking/models/Errors';
import { errorActions, usersActions } from './index'
import { getApi } from '../../networking/api/useApi';
import { store } from '../store';
import axios from 'axios';

const getWalletConstructor = (address) => {
    try{
        const wallet = new WalletConstructor(address)
        if(wallet){
            return wallet
        }
        return undefined
    }catch{
        new Error("Wallet doesn't exists ")
    }
}

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
         stopSplashLoader()
    })
}

const loadNetworks = () => async(dispatch) => {
    try{
        const api = getApi('restake', process.env.REACT_APP_RESTAKE_URL)
        const response = await api.getNetworks();
        dispatch({
            type: types.SET_NETWORKS,
            payload: response.data
        })
        const nodes = await axios.get(process.env.REACT_APP_MAIN_SERVER_URL + '/staking-node?version=1.0.4')
        dispatch({
            type: types.SET_STAKE_NODES,
            payload: nodes.data?.data
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


const setActiveWallet = (wallet) => (dispatch) => {
    dispatch({
        type: types.SET_ACTIVE_WALLET,
        payload: wallet,
    });
    const config = {
            lastWalletInfo: {
                address: wallet.address,
                network: wallet.network
            }
        }
    usersActions.setUserConfig(config)
}

export const walletActions = {
    getWalletConstructor,
    loadWalletWithBalances,
    loadNetworks,
    preparePermissionTransfer,
    stopSplashLoader,
    setActiveWallet
};