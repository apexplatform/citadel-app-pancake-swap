import {SET_POOL_INFO, SET_TOKEN_IN, SET_TOKEN_OUT,SET_SWAP_RATE, SET_SLIPPAGE, SET_INITIAL_RATE, SET_RATE_AMOUT, SET_SLIPPAGE_TOLERANCE, SET_TRADE, SET_ALLOWANCE, SET_MIN_RECEIVED, SET_SWAP_STATUS, SET_DEADLINE, SET_PARSED_AMOUNT,SET_DEADLINE_MINUTE, SET_FROM_TOKEN, SET_FIELD, SET_TIMER_APPROVE} from '../actions/types'
const initialState = {
    poolInfo: {},
    tokenIn: {},
    tokenOut: {},
    rate: 1,
    initialRate: 1,
    slippage: 0,
    rateAmount: 0,
    slippageTolerance: 1,
    trade: null,
    allowanceAmount: 0,
    minReceived: 0,
    swapStatus: 'enterAmount',
    deadline: 0,
    deadlineMin: 20,
    parsedAmount: 0,
    independentField: 'INPUT',
    timerApprove: false
}
export default function(state=initialState,action){
    switch (action.type){
        case SET_POOL_INFO:
            return {
                ...state,
                poolInfo: action.payload
            }
        case SET_TIMER_APPROVE:
            return {
                ...state,
                timerApprove: action.payload
            }
        case SET_FIELD:
            return {
                ...state,
                independentField: action.payload
            }
        case SET_DEADLINE_MINUTE:
            return {
                ...state,
                deadlineMin: action.payload
            }
        case SET_PARSED_AMOUNT:
            return {
                ...state,
                parsedAmount: action.payload
            }
        case SET_DEADLINE:
            return {
                ...state,
                deadline: action.payload
            }
        case SET_SWAP_STATUS:
            return {
                ...state,
                swapStatus: action.payload
            }
        case SET_MIN_RECEIVED:
            return {
                ...state,
                minReceived: action.payload
            }
        case SET_ALLOWANCE:
            return {
                ...state,
                allowanceAmount: action.payload
            }
        case SET_TRADE:
            return {
                ...state,
                trade: action.payload
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