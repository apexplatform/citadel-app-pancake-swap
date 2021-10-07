import {SET_OPENED_TRANSACTION} from '../actions/types'

const initialState = {
    openedTransaction: []
}
export default function(state=initialState,action){
    switch (action.type){
        case SET_OPENED_TRANSACTION:
            return {
                ...state,
                openedTransaction: action.payload
            }
        default:
            return state
    }
}