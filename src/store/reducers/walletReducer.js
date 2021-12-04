import {SET_CURRENT_WALLET,SET_WALLETS,SET_TOKEN,SET_TO_ADDRESS,SET_AMOUNT, SET_NETWORKS,SET_FROM_TOKEN,SET_TO_TOKEN,SET_FROM_AMOUNT,SET_TO_AMOUNT} from '../actions/types'
import { tokens } from '../../data'
const initialState = {
    currentWallet: null,
    currentToken: tokens[0],
    wallets: [],
    toAddress: null,
    amount: 0,
    networks: [],
    fromToken: tokens[0],
    toToken: tokens[1],
    fromTokenAmount: 0,
    toTokenAmount: 0
}
export default function(state=initialState,action){
    switch (action.type){
        case SET_CURRENT_WALLET:
            return {
                ...state,
                currentWallet: action.payload
            }
        case SET_WALLETS:
            return {
                ...state,
                wallets: action.payload
            }
        case SET_TOKEN:
            return {
                ...state,
                currentToken: action.payload
            }
        case SET_TO_ADDRESS:
            return {
                ...state,
                toAddress: action.payload
            }
        case SET_AMOUNT:
            return {
                ...state,
                amount: action.payload
            }
        case SET_NETWORKS:
            return {
                ...state,
                networks: action.payload
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