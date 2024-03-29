import { types } from '../actions/types'
import tokenList from '../../networking/constants/tokenLists/pancake-default.tokenlist.json'
import { Currency } from '@pancakeswap/sdk'
const tokens = [{...Currency.ETHER, symbol: 'BNB', name: "Binance Smart Chain", network: 'bsc', logoURI: "https://bscscan.com/token/images/binance_32.png"}, ...tokenList['tokens']]

const initialState = {
    wallets: [],
    networks: null,
    stakeNodes: null,
    transactionResponse: null,
    loader: true,
    activeWallet: null,
    showSplash: true,
    tokens: tokens,
    allowance: 0,
    usdPrice: 0
}

export default function WalletReducer(state = initialState, action) {
    switch (action.type) {
        case types.SET_WALLETS:
            return {
                ...state,
                wallets: action.payload
            }
        case types.SET_USD_PRICE:
            return {
                ...state,
                usdPrice: action.payload
            }
        case types.SET_ALLOWANCE:
            return {
                ...state,
                allowance: action.payload
            }
        case types.SET_TOKENS:
            return {
                ...state,
                tokens: action.payload
            }
        case types.SET_SPLASH_MODE:
            return {
                ...state,
                showSplash: action.payload,
            };
        case types.SET_ACTIVE_WALLET:
            return {
                ...state,
                activeWallet: action.payload,
            };
        case types.SET_LOADER:
            return {
                ...state,
                loader: action.payload,
            };
        case types.SET_PREPARE_TRANSFER_RESPONSE:
            return {
                ...state,
                transactionResponse: action.payload,
            };
        case types.SET_NETWORKS:
            return {
                ...state,
                networks: action.payload,
            };
        case types.SET_STAKE_NODES:
            return {
                ...state,
                stakeNodes: action.payload,
            };
        default:
            return state;
    }
}