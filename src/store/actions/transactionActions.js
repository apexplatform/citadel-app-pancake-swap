import { types } from './types';
import { walletActions, errorActions } from '.';
import {store} from '../store';
const setOpenedTransaction = (flag) => ({
    type: types.SET_OPENED_TRANSACTION,
    payload: flag
});

const loadTransactions = () => async (dispatch) => {
  const addressList = store.getState().wallet.wallets
   addressList?.forEach(async(address,i) => {
    const wallet = walletActions.getWalletConstructor(address);
    wallet.getTransactions().then(response => {
      const transactions = response?.data?.list.map(elem => {
        return {...elem, wallet: address}
      })
      dispatch({
        type: types.SET_TRANSACTIONS_LIST,
        payload: transactions,
      });
      if(i === addressList.length - 1){
        dispatch({
          type: types.SET_TRANSACTIONS_LOADED,
          payload: true,
        });
       }
     }).catch(e => {
      dispatch(errorActions.checkErrors(e))
    })
    })
  };


export const transactionActions = {
    setOpenedTransaction,
    loadTransactions
};