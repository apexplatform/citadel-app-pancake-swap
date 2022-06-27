// import { getWalletConstructor } from "./walletActions";
// import { checkErrors } from "./errorsActions";
// import store from "../store";
import { types } from "./types";

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

const updateSwapInfo = (amount = 0, isOut = true) => dispatch => {
  if(isOut){
    dispatch({
      type: types.SET_OUT_AMOUNT,
      payload: +amount * 0.3,
    });
  }else{
    dispatch({
      type: types.SET_OUT_AMOUNT,
      payload: +amount / 0.3,
    });
  }
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
    updateSwapInfo
};