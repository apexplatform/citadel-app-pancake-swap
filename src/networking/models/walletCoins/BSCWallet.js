import Wallet from '../Wallet';
import { eth } from '@citadeldao/apps-sdk';
import { SPENDER } from '../../constants/constants';
import MulticalABI from '../../constants/abi/Multicall.json';
import { store } from '../../../store/store';
import BigNumber from 'bignumber.js';
import { JSBI, Percent, Router } from '@pancakeswap/sdk';
import { ethers } from 'ethers';
import { getParsedAmount } from '../../methods/swap';
import { getCurrency } from '../../methods/tokens.ts';
export default class BSCWallet extends Wallet {
    async getTokenBalance(token) {
      const BEP20TokenContract = new eth.standards.BEP20(token.address);
      const result = await BEP20TokenContract.call("balanceOf", this.address);
      return result
    }
    async loadTokenAllowance(token) {
      const BEP20TokenContract = new eth.standards.BEP20(token.address);
      const response = await BEP20TokenContract.call('allowance', this.address, SPENDER)
      return parseInt(response?._hex || '0x0', 16)
    }
    async loadBlockNumber(deadlineMin){
      const ethContract = new eth.Contract('bsc', '0xfF6FD90A470Aaa0c1B8A54681746b07AcdFedc9B', MulticalABI);
      const result = await ethContract.call("getCurrentBlockTimestamp", [])
      return parseInt(result?._hex, 16) + (+deadlineMin * 60)
    }
    generateSwapTransaction(tokenIn,tokenInAmount,tokenOut,tokenOutAmount,trade,deadline,slippageTolerance,isExactIn){
      const { auth_token } = store.getState().user
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
          value : `${BigNumber(tokenInAmount).toNumber()} ${tokenIn.symbol}`,
          type : "text"
      },
      {
          title : `Swap to ${isExactIn ? '(estimated)' : ''}`,
          value : `${BigNumber(tokenOutAmount).toNumber()} ${tokenOut.symbol}`,
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
          "amount":  tokenInAmount,
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
    generateApproveTransaction(tokenIn,contractData){
      const { auth_token } = store.getState().user
      const meta_info = [
      {
          title : "Token",
          value : `${tokenIn.symbol} ${tokenIn.address}`,
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
      "to": tokenIn.address,
      "token": auth_token,
      "call": {
          "method": "approve",
          "params": [contractData.address,BigNumber(ethers.constants.MaxUint256._hex).toFixed()]
      },
      meta_info
      } 
      return body
    }
    generateDepositTransaction(tokenIn,amount,tokenOut){
      const { auth_token } = store.getState().user
      const meta_info = [
      {
          title : "Deposit from",
          value : `${tokenIn.symbol}`,
          type : "text"
      },
      {
          title : "Deposit to",
          value : `${tokenOut.symbol}`,
          type : "text"
      },
      {
          title : "Deposit amount",
          value : amount + ' ' + tokenIn.symbol,
          type : "text"
      } 
      ]
      const body =    
      {
      "amount": amount,
      "from": this.address,
      "to": tokenOut.address,
      "token": auth_token,
      "call": {
          "method": "deposit",
          "params": []
      },
      meta_info
      }
      return body
    } 
    generateWithdrawTransaction(tokenIn,amount,tokenOut){
      const { auth_token } = store.getState().user
      const inputCurrency = getCurrency(tokenIn.address || tokenIn.symbol)
      let parsedAmount = getParsedAmount(amount, inputCurrency)
      const meta_info = [
      {
          title : "Withdraw from",
          value : `${tokenIn.symbol}`,
          type : "text"
      },
      {
          title : "Withdraw to",
          value : `${tokenOut.symbol}`,
          type : "text"
      },
      {
          title : "Withdraw amount",
          value : amount + tokenIn.symbol,
          type : "text"
      } 
      ]
      const body =    
      {
      "amount": 0,
      "from": this.address,
      "to": tokenIn.address,
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