import {useTradeExact,tryParseAmount,loadBlockNumber,loadTokenBalances} from '../../hooks/swapHooks'
import {useCurrency} from '../../hooks/tokenHooks'
import { JSBI, Percent, Router } from '@pancakeswap/sdk'
import {basisPointsToPercent,computeTradePriceBreakdown} from '../../utils/price'
import store from '../../../store/store';
import { ethers } from 'ethers'
import {SPENDER} from '../../constants/constants'
import BigNumber from 'bignumber.js';
import Wallet from '../Wallet'
import {loadTokenAllowance} from '../../hooks/allowanceHooks'

export default class BSCWallet extends Wallet{
    constructor(opts) {
        super(opts);
    }   
    getBlockNumber(){
        return loadBlockNumber()
    }
    getTradeExact(amount,currency,isExactIn,updateCall){
        return useTradeExact(amount,currency,isExactIn,updateCall)
    } 
    getParseAmount(amount,currency){
        return tryParseAmount(amount?.toString(),currency)
    } 
    getTokenAllowance(){
        return loadTokenAllowance()
    }
    getcomputeTradePriceBreakdown(){
        const {trade} = store.getState().swapReducer
        return computeTradePriceBreakdown(trade)
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
            value : `${slippageTolerance}%`,
            type : "text"
        }     
        ]
        if(['swapETHForExactTokens','swapExactETHForTokens','swapExactETHForTokensSupportingFeeOnTransferTokens'].includes(call.methodName)){
        body =    
        {
            "amount":  BigNumber(call.value).toFixed(),
            "from": currentWallet.address,
            "to": SPENDER,
            "token": auth_token,
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
            "token": auth_token,
            "call": {
            "method": call.methodName,
            "params": [ BigNumber(call.args[0]).toFixed(),  BigNumber(call.args[1]).toFixed(), call.args[2], currentWallet.address, deadline]
            },
            meta_info
        }
        }
        
        return body
    }  
    generateApproveTransaction(contractData){
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
            text: contractData.name,
            url: contractData.url,
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
            "params": [contractData.address,BigNumber(ethers.constants.MaxUint256._hex).toFixed()]
        },
        meta_info
        }
        
        return body
    } 
}