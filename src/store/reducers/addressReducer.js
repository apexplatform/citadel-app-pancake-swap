import {SET_ADDRESS,SET_TOKEN,SET_FROM_TOKEN,SET_TO_TOKEN,SET_FROM_AMOUNT,SET_TO_AMOUNT} from '../actions/types'
import { addresses,tokens } from '../../data'
const initialState = {
    selectedAddress: addresses[0],
    selectedToken: null,
    fromToken: tokens[0],
    toToken: tokens[1],
    fromTokenAmount: 0,
    toTokenAmount: 0
}
export default function(state=initialState,action){
    switch (action.type){
        case SET_ADDRESS:
            return {
                ...state,
                selectedAddress: action.payload
            }
        case SET_TOKEN:
            return {
                ...state,
                selectedToken: action.payload
            }
        case SET_FROM_TOKEN:
            return {
                ...state,
                fromToken: action.payload
            }
        case SET_TO_TOKEN:
            return {
                ...state,
                toToken: action.payload
            }
        case SET_FROM_AMOUNT:
            return {
                ...state,
                fromTokenAmount: action.payload
            }
        case SET_TO_AMOUNT:
            return {
                ...state,
                toTokenAmount: action.payload
            }
        default:
            return state
    }
}