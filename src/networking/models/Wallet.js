import useApi from '../api/useApi';
import {ImplementationError,NetworkError} from './Errors'
import {useTradeExact,tryParseAmount,loadTokenBalance,loadBlockNumber,loadTokenBalances} from '../hooks/swapHooks'
import {useCurrency} from '../hooks/tokenHooks'
import { JSBI, Percent, Router } from '@pancakeswap/sdk'
import {basisPointsToPercent} from '../utils/price'
import store from '../../store/store';
import { ethers } from 'ethers'
import {ONE_BIPS} from '../constants/constants'
import {computeTradePriceBreakdown} from '../utils/price'
import {SPENDER} from '../constants/constants'
import BigNumber from 'bignumber.js';
import {loadTokenAllowance} from '../hooks/allowanceHooks'
import * as Sentry from "@sentry/react";

const api = useApi('wallet')
export default class Wallet {
  constructor(opts) {
      this.net = opts.network;
      this.name = opts.name;
      this.code = opts.code;
      this.address = opts.address;
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
        Sentry.captureException(data.error?.message || data.error?.message?.stack);
        if(data.error.error_type === 'custom_error') return new NetworkError(data.error?.message?.stack);
        return new Error(data.error?.message);
        
      }
    } 
  prepareClaimRewards() {
    return new ImplementationError('Method not implemented!')
  }  
  async getWalletBalance() {
    const {auth_token} = store.getState().userReducer
    const data = await api.getWalletBalance({
      network: this.net,
      address: this.address,
      token: auth_token
    });
    if (data.ok) {
      return data;
    } else {
      Sentry.captureException(data.error?.message || data.error?.message?.stack);
      if(data.error.error_type === 'custom_error') return new NetworkError(data.error?.message?.stack);
      return new Error(data.error?.message);
    }
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
  generateSwapTransaction(isExactIn){
    const {auth_token} = store.getState().userReducer
    const {currentWallet,fromToken,toToken,fromTokenAmount,toTokenAmount} = store.getState().walletReducer;
    const {trade,deadline,slippageTolerance} = store.getState().swapReducer;
    const BIPS_BASE = JSBI.BigInt(10000)
    const { priceImpactWithoutFee } = computeTradePriceBreakdown(trade)
    const call = Router.swapCallParameters(trade, {
      feeOnTransfer: false,
      allowedSlippage: new Percent(JSBI.BigInt(slippageTolerance), BIPS_BASE),
      recipient: currentWallet?.address,
      deadline: deadline,
    })
    let body = null
    let meta_info = [
      {
        title : `Swap from ${!isExactIn ? '(estimated)' : ''}`,
        value : `${BigNumber(fromTokenAmount).toNumber()} ${fromToken.symbol}`,
        type : "text"
      },
      {
        title : `Swap to ${isExactIn ? '(estimated)' : ''}`,
        value : `${BigNumber(toTokenAmount).toNumber()} ${toToken.symbol}`,
        type : "text"
      },
      {
        title : "Slipadge tolerance",
        value : `${priceImpactWithoutFee.lessThan(ONE_BIPS) ? '0.01' : priceImpactWithoutFee.toFixed(2)}%`,
        type : "text"
      }     
    ]
    if(['swapETHForExactTokens','swapExactETHForTokens','swapExactETHForTokensSupportingFeeOnTransferTokens'].includes(call.methodName)){
      body =    
      {
        "amount":  BigNumber(call.value).toFixed(),
        "from": currentWallet.address,
        "to": SPENDER,
        "token": auth_token || "6ee707ef-2948-42f0-a020-4a3cc6d334aa",
        "call": {
          "method": call.methodName,
          "params": [  BigNumber(call.args[0]).toFixed(), call.args[1], currentWallet.address, deadline]
        },
        meta_info
      }
    } else {
      body =    
      {
        "amount": 0,
        "from": currentWallet.address,
        "to": SPENDER,
        "token": auth_token || "6ee707ef-2948-42f0-a020-4a3cc6d334aa",
        "call": {
          "method": call.methodName,
          "params": [ BigNumber(call.args[0]).toFixed(),  BigNumber(call.args[1]).toFixed(), call.args[2], currentWallet.address, deadline]
        },
        meta_info
      }
    }
    
    return body
  }  
  generateApproveTransaction(){
    const {auth_token} = store.getState().userReducer
    const {fromToken,toToken} = store.getState().walletReducer;
    const meta_info = [
      {
        title : "Token",
        value : `${fromToken.symbol}-${toToken.symbol} ${fromToken.address}`,
        type : "text"
      },
      {
        title : "Contract to approve", 
        value : {
          text: "PancakeSwap: Router v2",
          url: "https://bscscan.com/address/0x10ed43c718714eb63d5aa57b78b54704e256024e",
        },
        type : "textWithURL"
      },
      {
        title : "Approve amount",
        value : 'Max',
        type : "text"
      } 
    ]
    const body =    
    {
      "amount": 0,
      "from": fromToken.address,
      "to": fromToken.address,
      "token": auth_token,
      "call": {
        "method": "approve",
        "params": [SPENDER,BigNumber(ethers.constants.MaxUint256._hex).toFixed()]
      },
      meta_info
    }
    
    return body
  } 
}