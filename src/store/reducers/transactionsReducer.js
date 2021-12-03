import {SET_OPENED_TRANSACTION,SET_TRANSACTIONS_LIST} from '../actions/types'

const initialState = {
    openedTransaction: [],
    transactions: []
}
export default function(state=initialState,action){
    switch (action.type){
        case SET_OPENED_TRANSACTION:
            return {
                ...state,
                openedTransaction: action.payload
            }
        case SET_TRANSACTIONS_LIST:
            return {
                ...state,
                transactions: action.payload
            }
        default:
            return state
    }
}