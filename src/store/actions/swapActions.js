import { store } from "../store";
import { types } from "./types";
import { errorActions, walletActions } from "./index";

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

const getSwapInfo = (amountIn, isOut) => async(dispatch) => {
  try{
    // let res = {error: true};
    // const { tokenIn, tokenOut } = store.getState().swap;
    if (+amountIn > 0) {
      // if(isOut){
      //   res = await getOutAmountRoute(tokenIn.code,tokenOut.code,amountIn)
      // }else{
      //   res = await getInAmountRoute(tokenIn.code,tokenOut.code,amountIn)
      // }
    }
  }catch(e){
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
    getSwapTransaction
};