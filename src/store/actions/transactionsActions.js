import { SET_OPENED_TRANSACTION,SET_TRANSACTIONS_LIST } from "./types";
import {getWalletConstructor} from './walletActions'
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
        dispatch({
            type: SET_TRANSACTIONS_LIST,
            payload: [
                {
                    "date": {
                        "title": "Timestamp",
                        "value": "2020-12-31T18:00:00.000Z",
                        "type": "datetime"
                    },
                    "type": {
                        "title": "Type",
                        "value": "stake",
                        "type": "text"
                    },
                    "from": {
                        "title": "From",
                        "value": "0x300300030303",
                        "type": "text"
                    },
                    "to": {
                        "title": "To",
                        "value": "0x000300303030",
                        "type": "text"
                    },
                    "amount": {
                        "title": "Amount",
                        "value": {
                            "amount": "1",
                            "ticker": "BNB"
                        },
                        "type": "amountWithTicker"
                    },
                    "fee": {
                        "title": "Fee",
                        "value": {
                            "amount": "1",
                            "ticker": "gasPrice"
                        },
                        "type": "amountWithTicker"
                    },
                    "status": {
                        "title": "Status",
                        "value": "Success",
                        "type": "text"
                    },
                    "meta_info": "test_info"
                }
            ]
        })
    }
}