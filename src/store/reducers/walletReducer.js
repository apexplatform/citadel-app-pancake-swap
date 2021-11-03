import {SET_CURRENT_WALLET,SET_TOKEN,SET_TO_ADDRESS,SET_AMOUNT, SET_NETWORKS,SET_FROM_TOKEN,SET_TO_TOKEN,SET_FROM_TOKEN_BALANCE,SET_TO_AMOUNT,SET_EMPTY_TOKEN_LIST, SET_GAS_PRICE, SET_TOKEN_LIST} from '../actions/types'
import { addresses } from '../../data'
import tokenList from '../../config/tokenLists/pancake-default.tokenlist.json'
import {Currency} from '@pancakeswap/sdk'
const qs = require('querystring');
const params = window.location.search.slice(1);
const paramsAsObject = qs.parse(params);
const tokens = [{...Currency.ETHER, logoURI: "https://pancakeswap.finance/images/tokens/0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c.png"}, ...tokenList['tokens']]
console.log(tokens,'--tokens')
let wallets = paramsAsObject.wallets ? JSON.parse(paramsAsObject.wallets)?.map(item => {
    return {
		address: item,
		amount: 0.01,
		network: 'bsc',
		name: 'Binance Smart Chain',
		code: 'BSC'
	}
}) : []
const initialState = {
    currentWallet: wallets[0] || null,
    currentToken: 'from',
    wallets: wallets,
    toAddress: null,
    amount: 0,
    tokenList: [], 
    networks: [],
    fromToken: tokens[0],
    toToken: tokens[1],
    fromTokenBalance: 0,
    toTokenAmount: 0,
    gasPrice: '45000'
}
export default function(state=initialState,action){
    switch (action.type){
        case SET_CURRENT_WALLET:
            return {
                ...state,
                currentWallet: action.payload
            }
        case SET_TOKEN_LIST:
            return {
                ...state,
                tokenList: [...state.tokenList, action.payload]
            }
        case SET_EMPTY_TOKEN_LIST:
            return {
                ...state,
                tokenList: action.payload
            }
        case SET_GAS_PRICE:
            return {
                ...state,
                gasPrice: action.payload
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
        case SET_FROM_TOKEN_BALANCE:
            return {
                ...state,
                fromTokenBalance: action.payload
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