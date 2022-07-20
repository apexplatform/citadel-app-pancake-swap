import { store } from "../store";
import { types } from "./types";
import { walletActions } from "./index";
import BigNumber from 'bignumber.js';

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

const getSwapInfo = (amount = 0, isOut = true) => dispatch => {
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
  dispatch(checkSwapStatus(amount))
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

const checkSwapStatus = (amount) => dispatch => {
  const { tokenIn } = store.getState().swap
  const { activeWallet, allowance } = store.getState().wallet
  const balance = tokenIn?.balance
  let feeProcent = activeWallet?.code === tokenIn?.symbol ? 0.01 : 0
  if(+amount > 0) {
    if(+amount > +balance){
      dispatch(setSwapStatus('insufficientBalance'))
    } else if(+amount <= BigNumber(+balance).minus(feeProcent).toNumber() && +activeWallet?.balance > 0){
        if(BigNumber(allowance).div(BigNumber(Math.pow(10,+tokenIn.decimals))).toNumber() > +amount){
          dispatch(setSwapStatus('swap'))
      } else {
        dispatch(setSwapStatus('feeError'))
      }
    } else {
      dispatch(setSwapStatus('enterAmount'))
    }
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
  setSelectedToken,
  getSwapInfo,
  getSwapTransaction,
  checkSwapStatus
};