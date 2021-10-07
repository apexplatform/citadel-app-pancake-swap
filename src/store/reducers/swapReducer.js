import {SET_POOL_INFO, SET_TOKEN_IN, SET_TOKEN_OUT,SET_SWAP_RATE, SET_SLIPPAGE, SET_POOL_ID, SET_INITIAL_RATE, SET_RATE_AMOUT, SET_SLIPPAGE_TOLERANCE} from '../actions/types'
import {swapPools} from '../../config/pools-config'
const initialState = {
    poolInfo: {},
    tokenIn: {},
    tokenOut: {},
    rate: 1,
    initialRate: 1,
    slippage: 0,
    pools: swapPools,
    poolId: 1,
    rateAmount: 0,
    slippageTolerance: 1
}
export default function(state=initialState,action){
    switch (action.type){
        case SET_POOL_INFO:
            return {
                ...state,
                poolInfo: action.payload
            }
        case SET_RATE_AMOUT:
            return {
                ...state,
                rateAmount: action.payload
            }
        case SET_SLIPPAGE_TOLERANCE:
            return {
                ...state,
                slippageTolerance: action.payload
            }
        case SET_INITIAL_RATE:
            return {
                ...state,
                initialRate: action.payload
            }
        case SET_POOL_ID:
            return {
                ...state,
                poolId: action.payload
            }
        case SET_TOKEN_IN:
            return {
                ...state,
                tokenIn: action.payload
            }
        case SET_TOKEN_OUT:
            return {
                ...state,
                tokenOut: action.payload
            }
        case SET_SWAP_RATE:
            return {
                ...state,
                rate: action.payload
            }
        case SET_SLIPPAGE:
            return {
                ...state,
                slippage: action.payload
            }
        default:
            return state
    }
}