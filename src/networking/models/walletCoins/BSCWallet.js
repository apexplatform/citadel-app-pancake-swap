import {useTradeExact,tryParseAmount,loadBlockNumber,loadTokenBalances,updateTokenBalances} from '../../methods/swapHooks'
import {useCurrency} from '../../methods/tokenHooks'
import { JSBI, Percent, Router } from '@pancakeswap/sdk'
import {basisPointsToPercent,computeTradePriceBreakdown} from '../../utils/price'
import store from '../../../store/store';
import { ethers } from 'ethers'
import {SPENDER} from '../../constants/constants'
import BigNumber from 'bignumber.js';
import Wallet from '../Wallet'
import {loadTokenAllowance} from '../../methods/allowanceHooks'

export default class BSCWallet extends Wallet{
    constructor(opts) {
        super(opts);
    }   
    getBlockNumber(deadlineMin){
        return loadBlockNumber(deadlineMin)
    }
    getBestTrade(amount,currency,isExactIn,updateCall){
        return useTradeExact(amount,currency,isExactIn,updateCall)
    } 
    getParseAmount(amount,currency){
        return tryParseAmount(amount?.toString(),currency)
    } 
    getTokenAllowance(token){
        return loadTokenAllowance(token,this.address)
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
    getTokenBalances(initial){
        return loadTokenBalances(initial)
    }
    updateTokenBalances(){
        return updateTokenBalances()
    }
    generateSwapTransaction(fromToken,fromTokenAmount,toToken,toTokenAmount,trade,deadline,slippageTolerance,isExactIn){
        const {auth_token} = store.getState().userReducer
        const BIPS_BASE = JSBI.BigInt(10000)
        const call = Router.swapCallParameters(trade, {
            feeOnTransfer: false,
            allowedSlippage: new Percent(JSBI.BigInt(Math.floor(slippageTolerance*100)), BIPS_BASE),
            recipient: this.address,
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
            title : "Slippage tolerance",
            value : `${slippageTolerance}%`,
            type : "text"
        }     
        ]
        if(['swapETHForExactTokens','swapExactETHForTokens','swapExactETHForTokensSupportingFeeOnTransferTokens'].includes(call.methodName)){
        body =    
        {
            "amount":  fromTokenAmount,
            "from": this.address,
            "to": SPENDER,
            "token": auth_token,
            "call": {
            "method": call.methodName,
            "params": [  BigNumber(call.args[0]).toFixed(), call.args[1], this.address, deadline]
            },
            meta_info
        }
        } else {
        body =    
        {
            "amount": 0,
            "from": this.address,
            "to": SPENDER,
            "token": auth_token,
            "call": {
            "method": call.methodName,
            "params": [ BigNumber(call.args[0]).toFixed(),  BigNumber(call.args[1]).toFixed(), call.args[2], this.address, deadline]
            },
            meta_info
        }
        }
        
        return body
    }  
    generateApproveTransaction(fromToken,contractData){
        const {auth_token} = store.getState().userReducer
        const meta_info = [
        {
            title : "Token",
            value : `${fromToken.symbol} ${fromToken.address}`,
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
        "from": this.address,
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
    generateDepositTransaction(fromToken,amount,toToken){
        const {auth_token} = store.getState().userReducer
        const meta_info = [
        {
            title : "Deposit from",
            value : `${fromToken.symbol}`,
            type : "text"
        },
        {
            title : "Deposit to",
            value : `${toToken.symbol}`,
            type : "text"
        },
        {
            title : "Deposit amount",
            value : amount + ' ' + fromToken.symbol,
            type : "text"
        } 
        ]
        const body =    
        {
        "amount": amount,
        "from": this.address,
        "to": toToken.address,
        "token": auth_token,
        "call": {
            "method": "deposit",
            "params": []
        },
        meta_info
        }
        
        return body
    } 
    generateWithdrawTransaction(fromToken,amount,toToken){
        const {auth_token} = store.getState().userReducer
        const inputCurrency = this.getCurrency(fromToken.address || fromToken.symbol)
        let parsedAmount = this.getParseAmount(amount, inputCurrency)
        const meta_info = [
        {
            title : "Withdraw from",
            value : `${fromToken.symbol}`,
            type : "text"
        },
        {
            title : "Withdraw to",
            value : `${toToken.symbol}`,
            type : "text"
        },
        {
            title : "Withdraw amount",
            value : amount + fromToken.symbol,
            type : "text"
        } 
        ]
        const body =    
        {
        "amount": 0,
        "from": this.address,
        "to": fromToken.address,
        "token": auth_token,
        "call": {
            "method": "withdraw",
            "params": [`0x${parsedAmount.raw.toString(16)}`]
        },
        meta_info
        }
        
        return body
    }  
}