import useApi from '../api/useApi';
import {ImplementationError,NetworkError} from './Errors'
import {useTradeExact,tryParseAmount,loadTokenBalance,loadBlockNumber} from '../hooks/swapHooks'
import {useCurrency} from '../hooks/tokenHooks'
import { JSBI, Percent, Router } from '@pancakeswap/sdk'
const api = useApi('wallet')
import {basisPointsToPercent} from '../utils/price'
import store from '../../store/store';
import { ethers } from 'ethers'
import {loadTokenAllowance,loadGasPrice} from '../hooks/allowanceHooks'
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
        return new NetworkError(data.error.message);
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
    console.log(pct)
    return trade?.minimumAmountOut(pct) || 0
  }
  getGasPrice(){
    return loadGasPrice()
  }
  generateSwapTransaction(){
    const {auth_token} = store.getState().userReducer
    const {amount,fromToken,toToken,currentWallet} = store.getState().walletReducer;
    const {trade,deadline,slippageTolerance} = store.getState().swapReducer;
    const BIPS_BASE = JSBI.BigInt(10000)
    const call = Router.swapCallParameters(trade, {
      feeOnTransfer: false,
      allowedSlippage: new Percent(JSBI.BigInt(slippageTolerance), BIPS_BASE),
      recipient: currentWallet.address,
      deadline: deadline,
    })
    const body =    
    {
      "gas": "160000",
      "amount": +amount,
      "from": fromToken.address,
      "to": toToken.address,
      "token": auth_token,
      "call": {
        "method": call.methodName,
        "params": [ parseInt(call.args[0], 16), parseInt(call.args[1], 16), call.args[2], deadline]
      }
    }
    return body
  }  
  generateApproveTransaction(){
    const {auth_token} = store.getState().userReducer
    const {fromToken,toToken,gasPrice} = store.getState().walletReducer;
    let body =    
    {
      "gas": gasPrice,
      "amount": 0,
      "from": fromToken.address,
      "to": toToken.address,
      "token": auth_token,
      "call": {
        "method": "approve",
        "params": [fromToken?.address,ethers.constants.MaxUint256._hex]
      }
    }
    
    return body
  } 
}