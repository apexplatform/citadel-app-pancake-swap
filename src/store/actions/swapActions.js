import { store } from "../store";
import { types } from "./types";
import { errorActions, walletActions } from "./index";
import { getParsedAmount, getBestTrade } from '../../networking/methods/swap';
import { getCurrency } from '../../networking/methods/tokens.ts';
import { basisPointsToPercent, computeTradePriceBreakdown } from '../../networking/utils/price.ts';
import BigNumber from 'bignumber.js';

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
  const { amount } = store.getState().swap
  dispatch(checkSwapStatus(amount))
};

const setIndependentField = (field) => (dispatch) => {
  dispatch({
    type: types.SET_FIELD,
    payload: field,
  });
};

const setAmount = (amount,isExactIn=true) => (dispatch) => {
  dispatch({
    type: types.SET_AMOUNT,
    payload: amount,
  });
  dispatch({
    type: types.SET_EXACT_IN,
    payload: isExactIn,
  });
};

const setTokenIn = (token) => async(dispatch) => {
  dispatch({
    type: types.SET_TOKEN_IN,
    payload: token,
  });
  if(token.symbol !== 'BNB'){
    const { activeWallet } = store.getState().wallet;
    const wallet = walletActions.getWalletConstructor(activeWallet);
    let allowance = await wallet.loadTokenAllowance(token)
    store.dispatch({
        type: types.SET_ALLOWANCE,
        payload: allowance,
    });
  }
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

const setAmountOut = (amount) => dispatch => {
  dispatch({
    type: types.SET_OUT_AMOUNT,
    payload: amount
  });
}

const setAmountIn = (amount) => dispatch => {
  dispatch({
    type: types.SET_IN_AMOUNT,
    payload: amount
  });
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

const getTradeFeePrice = (trade) => {
  return computeTradePriceBreakdown(trade)
}

const getSwapInfo = (amountIn, isExactIn=true, isSwap=false) => async(dispatch) => {
  try{
    if(+amountIn > 0){
      const { tokenIn, tokenOut, independentField, trade, slippageTolerance } = store.getState().swap;
      const inputCurrency = getCurrency(tokenIn.address || tokenIn.symbol)
      const outputCurrency = getCurrency(tokenOut.address || tokenOut.symbol)
      let parsedAmount = getParsedAmount(amountIn.toString(), isExactIn ? inputCurrency : outputCurrency)
      dispatch(setParsedAmount(parsedAmount))
      const bestTradeExact = dispatch(getBestTrade(parsedAmount, isExactIn ? outputCurrency : inputCurrency, isExactIn))
      console.log(bestTradeExact,'--bestTradeExact')
      dispatch(setAmountIn(independentField === 'INPUT' ? amountIn : trade?.inputAmount?.toSignificant(6)))
      dispatch(setAmountOut(independentField === 'OUTPUT' ? amountIn : bestTradeExact?.outputAmount?.toSignificant(6)))
      if(isSwap){
        dispatch({
          type: types.SET_UPDATED_TRADE,
          payload: bestTradeExact
        })
        if(isExactIn){
          let minAmount = +trade?.outputAmount?.toSignificant(6) * ((100 - +slippageTolerance) / 100)
          console.log(minAmount, +bestTradeExact?.outputAmount?.toSignificant(6),'-----00')
          if( minAmount > +bestTradeExact?.outputAmount?.toSignificant(6)){
            dispatch(errorActions.setConfirmModal(true))
          }else{
            dispatch(setTrade(bestTradeExact))
            dispatch(getSwapTransaction())
          }
        }else{
          let minAmount = +trade?.inputAmount?.toSignificant(6) * ((100 + +slippageTolerance) / 100)
          console.log(minAmount, +bestTradeExact?.inputAmount?.toSignificant(6),'-----11')
          if(minAmount < +bestTradeExact?.inputAmount?.toSignificant(6)){
            dispatch(errorActions.setConfirmModal(true))
          }else{
            dispatch(setTrade(bestTradeExact))
            dispatch(getSwapTransaction())
          }
        }        
      }else{
        dispatch(setTrade(bestTradeExact))
        dispatch(setMinReceive(getMinReceived(bestTradeExact)))
      } 
    }else{
      dispatch(setTrade(null))
      dispatch(setMinReceive(0))
    }
    dispatch(checkSwapStatus(amountIn))
  }catch(e){
    console.log(e)
    dispatch(errorActions.checkErrors(e))
  }
  
}


const checkSwapStatus = (amount) => dispatch => {
  const { tokenIn, slippageTolerance, trade } = store.getState().swap
  const { activeWallet, allowance } = store.getState().wallet
  const { priceImpactWithoutFee } = getTradeFeePrice(trade)
  const balance = tokenIn.balance
  let feeProcent = activeWallet?.code === tokenIn?.symbol ? 0.001 : 0
  if(+amount > 0) {
      if(+amount > +balance){
          dispatch(setSwapStatus('insufficientBalance'))
      } else if(+amount <= BigNumber(+balance).minus(feeProcent).toNumber() && +activeWallet.balance > 0){
                  if(BigNumber(allowance).div(BigNumber(Math.pow(10,+tokenIn.decimals))).toNumber() > +amount || tokenIn.symbol === 'BNB'){
                      if(parseFloat(priceImpactWithoutFee?.toFixed(2)||0) < +slippageTolerance){
                          dispatch(setSwapStatus('swap'))
                      }else{
                          dispatch(setSwapStatus('swapAnyway'))
                      }
                  } else {
                      dispatch(setSwapStatus('approve'))
                  }
              } else {
                  dispatch(setSwapStatus('feeError'))
              }
  } else {
      dispatch(setSwapStatus('enterAmount'))
  }
}

const getApproveTransaction  = () => dispatch => {
  const wallet = walletActions.getWalletConstructor()
  console.log(wallet,'--wallet')
  if(wallet){
      const { tokenIn } = store.getState().swap;
      const contractData = {
          address: "0x10ED43C718714eb63d5aA57B78B54704E256024E",
          name: "PancakeSwap: Router v2",
          url: "https://bscscan.com/address/0x10ed43c718714eb63d5aa57b78b54704e256024e"
      }
      const transaction = wallet.generateApproveTransaction(tokenIn,contractData)
      wallet.prepareTransfer(transaction).then((ok, data) => {
          if(ok){
              return dispatch ({
                  type: types.SET_PREPARE_TRANSFER_RESPONSE,
                  payload: data
              })
          }
      }).catch(err => {
        dispatch(errorActions.checkErrors(err.response?.data?.error))
      })
  }
}

const checkTradeUpdate = () => {
  const { amount, isExactIn  } = store.getState().swap
  store.dispatch(getSwapInfo(amount,isExactIn,true))
}

const getSwapTransaction  = () => async(dispatch) => {
  const wallet = walletActions.getWalletConstructor()
  dispatch(setSwapDisable(true))
  if(wallet){
      const { deadlineMin } = store.getState().swap
      const deadline = await wallet.loadBlockNumber(deadlineMin)
      const {trade,slippageTolerance,isExactIn,tokenIn,tokenOut,amount,amountOut} = store.getState().swap;
      let transaction = null
      if(tokenIn.symbol === 'BNB' && tokenOut.symbol === 'WBNB'){
        transaction = wallet.generateDepositTransaction(tokenIn,amount,tokenOut)
      }else if(tokenIn.symbol === 'WBNB' && tokenOut.symbol === 'BNB'){
        transaction = wallet.generateWithdrawTransaction(tokenIn,amount,tokenOut)
      }else{
        transaction = wallet.generateSwapTransaction(tokenIn,amount,tokenOut,amountOut,trade,deadline,slippageTolerance,isExactIn)
      }
      console.log(transaction,'--transaction')
      wallet.prepareTransfer(transaction).then((response) => {
          if(response?.ok){
            dispatch ({
                type: types.SET_PREPARE_TRANSFER_RESPONSE,
                payload: response.data
            })
          }
      }).catch(err => {
        dispatch(errorActions.checkErrors(err.response?.data?.error))
      })
  }
  setTimeout(() => {
    dispatch(setSwapDisable(false))
  }, 5000);
}

export const swapActions = {
    setSwapDisable,
    setSwapStatus,
    setSlippageTolerance,
    setIndependentField,
    setAmount,
    setTokenIn,
    setTokenOut,
    setAmountOut,
    setSelectedToken,
    getSwapInfo,
    setParsedAmount,
    getTradeFeePrice,
    getApproveTransaction,
    getSwapTransaction,
    checkTradeUpdate,
    setAmountIn
};