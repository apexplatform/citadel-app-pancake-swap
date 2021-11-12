import {SET_CURRENT_WALLET,SET_TOKEN,SET_TO_ADDRESS,SET_AMOUNT, SET_NETWORKS,SET_FROM_TOKEN,SET_TO_TOKEN,SET_FROM_TOKEN_AMOUNT,SET_WALLETS,SET_TO_AMOUNT,SET_EMPTY_TOKEN_LIST, SET_TOKEN_LIST, SET_INITIAL_LOAD} from '../actions/types'
import tokenList from '../../networking/constants/tokenLists/pancake-default.tokenlist.json'
import {Currency} from '@pancakeswap/sdk'
const tokens = [{...Currency.ETHER,symbol: 'BNB', logoURI: "https://pancakeswap.finance/images/tokens/0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c.png"}, ...tokenList['tokens']]

const initialState = {
    currentWallet: null,
    currentToken: 'from',
    wallets: null,
    toAddress: null,
    amount: 0,
    tokenList: null, 
    networks: [],
    fromToken: tokens[2],
    toToken: tokens[1],
    fromTokenAmount: 0,
    toTokenAmount: 0,
    initialLoader: true
}

export default function(state=initialState,action){
    switch (action.type){
        case SET_CURRENT_WALLET:
            return {
                ...state,
                currentWallet: action.payload
            }
        case SET_INITIAL_LOAD:
            return {
                ...state,
                initialLoader: action.payload
            }
        case SET_WALLETS:
            return {
                ...state,
                wallets: action.payload
            }
        case SET_TOKEN_LIST:
            return {
                ...state,
                tokenList: [...state.tokenList, action.payload]
            }
        case SET_EMPTY_TOKEN_LIST:
            return {
                ...state,
                tokenList: []
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
        case SET_FROM_TOKEN_AMOUNT:
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