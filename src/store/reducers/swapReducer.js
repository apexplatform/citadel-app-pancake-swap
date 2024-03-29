import { types } from "../actions/types";
import tokenList from '../../networking/constants/tokenLists/pancake-default.tokenlist.json'
import { Currency } from '@pancakeswap/sdk'
const tokens = [{...Currency.ETHER, symbol: 'BNB', network: 'bsc', logoURI: "https://bscscan.com/token/images/binance_32.png"}, ...tokenList['tokens']]

const initialState = {
  tokenIn: tokens[2],
  tokenOut: tokens[1],
  rate: 0,
  initialRate: 1,
  slippage: 0,
  slippageTolerance: 1,
  trade: null,
  updatedTrade: null,
  swapStatus: "enterAmount",
  independentField: "INPUT",
  parsedAmount: 0,
  swapFee: 0,
  isExactIn: true,
  fromUSD: 0,
  toUSD: 0,
  disableSwap: false,
  swapInfo: null,
  amount: 0,
  amountOut: 0,
  amountIn: 0,
  minReceived: null,
  selectedToken: 'INPUT',
  deadlineMin: 20,
  routes: []
};
export default function SwapReducer (state = initialState, action) {
  switch (action.type) {
    case types.SET_SWAP_INFO:
      return {
        ...state,
        swapInfo: action.payload,
      };
    case types.SET_EXACT_IN:
      return {
        ...state,
        isExactIn: action.payload,
      };
    case types.SET_IN_AMOUNT:
      return {
        ...state,
        amountIn: action.payload,
      };
    case types.SET_UPDATED_TRADE:
      return {
        ...state,
        updatedTrade: action.payload,
      };
    case types.SET_PARSED_AMOUNT:
      return {
          ...state,
          parsedAmount: action.payload
      }
    case types.SET_TRADE:
      return {
        ...state,
        trade: action.payload,
      };
    case types.SET_MIN_RECEIVED:
      return {
        ...state,
        minReceived: action.payload
      }
    case types.SET_AMOUNT:
      return {
        ...state,
        amount: action.payload,
      };
    case types.SET_SELECTED_TOKEN:
      return {
        ...state,
        selectedToken: action.payload,
      };
    case types.SET_DISABLE_SWAP:
      return {
        ...state,
        disableSwap: action.payload,
      };
    case types.SET_FROM_USD_PRICE:
      return {
        ...state,
        fromUSD: action.payload,
      };
    case types.SET_TO_USD_PRICE:
      return {
        ...state,
        toUSD: action.payload,
      };
    case types.SET_SWAP_FEE:
      return {
        ...state,
        swapFee: action.payload,
      };
    case types.SET_OUT_AMOUNT:
      return {
        ...state,
        amountOut: action.payload,
      };
    case types.SET_SWAP_STATUS:
      return {
        ...state,
        swapStatus: action.payload,
      };
    case types.SET_FIELD:
      return {
        ...state,
        independentField: action.payload,
      };
    case types.SET_SLIPPAGE_TOLERANCE:
      return {
        ...state,
        slippageTolerance: action.payload,
      };
    case types.SET_INITIAL_RATE:
      return {
        ...state,
        initialRate: action.payload,
      };
    case types.SET_TOKEN_IN:
      return {
        ...state,
        tokenIn: action.payload,
      };
    case types.SET_TOKEN_OUT:
      return {
        ...state,
        tokenOut: action.payload,
      };
    case types.SET_SWAP_RATE:
      return {
        ...state,
        rate: action.payload,
      };
    case types.SET_SLIPPAGE:
      return {
        ...state,
        slippage: action.payload,
      };
    default:
      return state;
  }
}
