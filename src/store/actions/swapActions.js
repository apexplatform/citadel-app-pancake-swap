import { store } from "../store";
import { types } from "./types";
import { errorActions, walletActions } from "./index";
import { getParsedAmount, getBestTrade } from '../../networking/methods/swap';
import { getCurrency } from '../../networking/methods/tokens.ts';
import { basisPointsToPercent, computeTradePriceBreakdown } from '../../networking/utils/price.ts';

const setRateAmount = (amount) => (dispatch) => {
  dispatch({
    type: types.SET_RATE_AMOUT,
    payload: amount,
  });
};
const setSwapDisable = (status) => (dispatch) => {
  dispatch({
    type: types.SET_DISABLE_SWAP,
    payload: status,
  });
};
const setSwapStatus = (status) => (dispatch) => {
  dispatch({
    type: types.SET_SWAP_STATUS,
    payload: status,
  });
};
  
const setSlippageTolerance = (procent) => (dispatch) => {
  dispatch({
    type: types.SET_SLIPPAGE_TOLERANCE,
    payload: procent,
  });
};

const setIndependentField = (field) => (dispatch) => {
  dispatch({
    type: types.SET_FIELD,
    payload: field,
  });
};

const setAmount = (amount) => (dispatch) => {
  dispatch({
    type: types.SET_AMOUNT,
    payload: amount,
  });
};

const setTokenIn = (token) => (dispatch) => {
  dispatch({
    type: types.SET_TOKEN_IN,
    payload: token,
  });
};

const setTokenOut = (token) => (dispatch) => {
  dispatch({
    type: types.SET_TOKEN_OUT,
    payload: token,
  });
};

const setSelectedToken = (token) => (dispatch) => {
  dispatch({
    type: types.SET_SELECTED_TOKEN,
    payload: token,
  });
};

const updateSwapInfo = (amount = 0, isOut = true) => dispatch => {
  if(isOut){
    dispatch({
      type: types.SET_OUT_AMOUNT,
      payload: +amount * 0.5,
    });
  }else{
    dispatch({
      type: types.SET_OUT_AMOUNT,
      payload: +amount / 0.5,
    });
  }
}

export const setTrade = (bestTrade) => dispatch =>{
  dispatch({
      type: types.SET_TRADE,
      payload: bestTrade
  })
}

export const setMinReceive = (amount) => dispatch =>{
  dispatch({
      type: types.SET_MIN_RECEIVED,
      payload: amount
  })
}
function getMinReceived(trade){
  const { slippageTolerance } = store.getState().swap
  const pct = basisPointsToPercent(slippageTolerance)
  return trade?.minimumAmountOut(pct) || 0
}

const setParsedAmount = (amount) => dispatch =>{
  dispatch({
      type: types.SET_PARSED_AMOUNT,
      payload: amount
  })
}

const getTradeFeePrice = () => {
  const {trade} = store.getState().swap
  return computeTradePriceBreakdown(trade)
}

const getSwapInfo = (amountIn, isOut=true, updateCall = false) => async(dispatch) => {
  try{
    const { tokenIn, tokenOut } = store.getState().swap;
    const inputCurrency = getCurrency(tokenIn.address || tokenIn.symbol)
  //  console.log(inputCurrency,'--inputCurrency')
    const outputCurrency = getCurrency(tokenOut.address || tokenOut.symbol)
 //   console.log(outputCurrency,'--outputCurrency')
    let parsedAmount = getParsedAmount(amountIn, isOut ? inputCurrency : outputCurrency)
    dispatch(setParsedAmount(parsedAmount))
    const bestTradeExact = dispatch(getBestTrade(parsedAmount, isOut ? outputCurrency : inputCurrency, isOut, updateCall))
    console.log(bestTradeExact,'--bestTradeExact')
    dispatch(setTrade(bestTradeExact))
    dispatch(setMinReceive(getMinReceived(bestTradeExact)))
    console.log(getMinReceived(bestTradeExact),'--getMinReceived(bestTradeExact))')
  }catch(e){
    console.log(e)
    dispatch(errorActions.checkErrors(e))
  }
  
}

const getSwapTransaction = (formattedAmounts, isOut, slippage) => dispatch => {
  const { tokenIn, tokenOut } = store.getState().swap;
  const { activeWallet } = store.getState().wallet;
  const wallet = dispatch(walletActions.getWalletConstructor(activeWallet));
  const transaction = wallet.generateSwapTransaction(
    isOut,
    tokenIn,
    formattedAmounts["INPUT"],
    tokenOut,
    formattedAmounts["OUTPUT"],
    slippage,
  );
  console.log(transaction)
}

export const swapActions = {
    setRateAmount,
    setSwapDisable,
    setSwapStatus,
    setSlippageTolerance,
    setIndependentField,
    setAmount,
    setTokenIn,
    setTokenOut,
    updateSwapInfo,
    setSelectedToken,
    getSwapInfo,
    getSwapTransaction,
    setParsedAmount,
    getTradeFeePrice
};