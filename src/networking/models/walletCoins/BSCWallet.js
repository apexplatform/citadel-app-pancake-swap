import Wallet from '../Wallet';
import useApi from '../../api/useApi';
import {useTradeExact,tryParseAmount,loadTokenBalance,loadBlockNumber} from '../../hooks/swapHooks'
import {useCurrency} from '../../hooks/tokenHooks'
import { JSBI, Percent, Router } from '@pancakeswap/sdk'
import {basisPointsToPercent} from '../../utils/price'
import store from '../../../store/store';
import { ethers } from 'ethers'
import {SPENDER} from '../../../config/constants'
import {loadTokenAllowance} from '../../hooks/allowanceHooks'

export default class BSCWallet extends Wallet {
    constructor(opts) {
        super(opts);
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
        "amount": +amount,
        "from": fromToken.address,
        "to": SPENDER,
        "token": auth_token || "5aecc8e9-61a8-47fc-9726-de8e97b6f07d",
        "call": {
        "method": call.methodName,
        "params": [ parseInt(call.args[0], 16), parseInt(call.args[1], 16), call.args[2], currentWallet.address, deadline]
        }
    }
    return body
    }  
    generateApproveTransaction(){
    const {auth_token} = store.getState().userReducer
    const {fromToken,toToken} = store.getState().walletReducer;
    let body =    
    {
        "amount": 1,
        "from": fromToken.address,
        "to": toToken.address,
        "token": auth_token || "5aecc8e9-61a8-47fc-9726-de8e97b6f07d",
        "call": {
        "method": "approve",
        "params": [SPENDER,parseInt(ethers.constants.MaxUint256._hex, 16)]
        }
    }
    
    return body
    } 
}