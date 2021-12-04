import {tryParseAmount,loadBlockNumber,loadTokenBalances} from '../../bscMethods/hooks/swapHooks'
import {useCurrency} from '../../bscMethods/hooks/tokenHooks'
import store from '../../../store/store';
import { ethers } from 'ethers'
import {SPENDER} from '../../bscMethods/constants/constants'
import BigNumber from 'bignumber.js';
import Wallet from '../Wallet'
import {loadTokenAllowance} from '../../bscMethods/hooks/allowanceHooks'

export default class BSCWallet extends Wallet{
    constructor(opts) {
        super(opts);
    }   
    getBlockNumber(){
        return loadBlockNumber()
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
    getTokenBalances(){
        return loadTokenBalances()
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