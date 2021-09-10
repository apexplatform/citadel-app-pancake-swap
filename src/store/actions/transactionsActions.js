import { SET_OPENED_TRANSACTION } from "./types";

export const setSelectedTransaction = (transaction) => dispatch =>{
    dispatch({
        type: SET_OPENED_TRANSACTION,
        payload: transaction
    })
}