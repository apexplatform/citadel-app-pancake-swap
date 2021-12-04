import useApi from '../../api/useApi';
import {tryParseAmount,loadBlockNumber,loadTokenBalances} from '../../ethMethods/hooks/swapHooks'
import {useCurrency} from '../../ethMethods/hooks/tokenHooks'
import store from '../../../store/store';
import { ethers } from 'ethers'
import {SPENDER} from '../../ethMethods/constants'
import BigNumber from 'bignumber.js';
import {loadTokenAllowance} from '../../ethMethods/hooks/allowanceHooks'
import Wallet from '../Wallet';
const apiSwap = useApi('swap',true)
export default class ETHWallet extends Wallet {
    constructor(opts) {
        super(opts);
    }  
    async loadSwapInfo() {
        const {fromToken,amount,toToken} = store.getState().walletReducer;
        try{
        const data = await apiSwap.loadSwapInfo({
            tokenInAddress: fromToken.address,
            tokenInChainId: fromToken.chainId,
            tokenOutAddress: toToken.address,
            tokenOutChainId: toToken.chainId,
            amount: +amount != 0 ? amount : 1,
            exactIn: 'exactIn'
        });
        if (data) {
            return data;
        } 
        } catch (e){
        Sentry.captureException(e?.detail || e);
        return new Error(e?.detail);
        }
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
            text: "UniSwap: Router v2",
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