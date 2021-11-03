import useApi from '../api/useApi';
import {ImplementationError,NetworkError} from './Errors'
import {useTradeExact,tryParseAmount,loadTokenBalance,loadBlockNumber,loadTokenBalances} from '../hooks/swapHooks'
import {useCurrency} from '../hooks/tokenHooks'
import { JSBI, Percent, Router } from '@pancakeswap/sdk'
import {basisPointsToPercent} from '../utils/price'
import store from '../../store/store';
import { ethers } from 'ethers'
import {SPENDER} from '../../config/constants'
import BigNumber from 'bignumber.js';
import {loadTokenAllowance} from '../hooks/allowanceHooks'
const api = useApi('wallet')
export default class Wallet {
  constructor(opts) {
      this.net = opts.network;
      this.name = opts.name;
      this.code = opts.code;
      this.address = opts.address;
      this.publicKey = opts.publicKey || null; 
  }
  async prepareTransfer(params) {
      const data = await api.prepareBaseTransfer({
        network: this.net,
        from: this.address,
        transaction: params,
      });
      if (data.ok) {
        return data;
      } else {
        console.log('-errr',data.error)
        return new NetworkError(data.error.stack);
      }
    } 
  prepareClaimRewards() {
    return new ImplementationError('Method not implemented!')
  }  
  getTokenBalance(address){
    return loadTokenBalance(address)
  }
  getBlockNumber(){
    return loadBlockNumber()
  }
  getTradeExact(amount,currency,isExactIn){
    return useTradeExact(amount,currency,isExactIn)
  } 
  getParseAmount(amount,currency){
    return tryParseAmount(amount?.toString(),currency)
  } 
  getTokenAllowance(){
    return loadTokenAllowance()
  }
  getCurrency(address){
    return useCurrency(address)
  } 
  getMinReceived(){
    const {trade,slippageTolerance} = store.getState().swapReducer
    const pct = basisPointsToPercent(slippageTolerance)
    return trade?.minimumAmountOut(pct) || 0
  }
  getTokenBalances(){
    return loadTokenBalances()
  }
  generateSwapTransaction(){
    const {auth_token} = store.getState().userReducer
    const {currentWallet,fromToken} = store.getState().walletReducer;
    console.log(fromToken,'===fromToken')
    const {trade,deadline,slippageTolerance} = store.getState().swapReducer;
    const BIPS_BASE = JSBI.BigInt(10000)
    const call = Router.swapCallParameters(trade, {
      feeOnTransfer: false,
      allowedSlippage: new Percent(JSBI.BigInt(slippageTolerance), BIPS_BASE),
      recipient: currentWallet?.address,
      deadline: deadline,
    })
    console.log(call,'--call')
    let body = null
   
    if(['swapETHForExactTokens','swapExactETHForTokens','swapExactETHForTokensSupportingFeeOnTransferTokens'].includes(call.methodName)){
      body =    
      {
        "amount":  BigNumber(call.value),
        "from": currentWallet.address,
        "to": SPENDER,
        "token": auth_token,
        "call": {
          "method": call.methodName,
          "params": [  BigNumber(call.args[0]), call.args[1], currentWallet.address, deadline]
        }
      }
    } else {
      body =    
      {
        "amount": 0,
        "from": currentWallet.address,
        "to": SPENDER,
        "token": auth_token,
        "call": {
          "method": call.methodName,
          "params": [ +BigNumber(call.args[0]).toFixed(),  +BigNumber(call.args[1]).toFixed(), call.args[2], currentWallet.address, deadline]
        }
      }
    }
    
    return body
  }  
  generateApproveTransaction(){
    const {auth_token} = store.getState().userReducer
    const {fromToken,toToken} = store.getState().walletReducer;
    let body =    
    {
      "amount": 0,
      "from": fromToken.address,
      "to": fromToken.address,
      "token": auth_token,
      "call": {
        "method": "approve",
        "params": [SPENDER,BigNumber(ethers.constants.MaxUint256._hex).toFixed()]
      }
    }
    
    return body
  } 
}