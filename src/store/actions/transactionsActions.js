import { SET_OPENED_TRANSACTION,SET_TRANSACTIONS_LIST } from "./types";
import {getWalletConstructor} from './walletActions'
import {setLoader} from './panelActions'
export const setSelectedTransaction = (transaction) => dispatch =>{
    dispatch({
        type: SET_OPENED_TRANSACTION,
        payload: transaction
    })
}



export const loadTransactions = () => async dispatch =>{
    const wallet = getWalletConstructor()
    if(wallet){
        const transactions = await wallet.getTransactions()
        console.log(transactions)
        dispatch({
            type: SET_TRANSACTIONS_LIST,
            payload: transactions?.data?.list
        })
        dispatch(setLoader(false))
    }
}