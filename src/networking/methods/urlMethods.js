import  { getWalletConstructor } from '../../store/actions/walletActions'
import { networks } from '../models/network.js'
import { SET_CURRENT_WALLET, SET_SWAP_INFO} from '../../store/actions/types'
import store from '../../store/store';
import { Currency } from '@pancakeswap/sdk'
import tokenList from '../constants/tokenLists/pancake-default.tokenlist.json'
const qs = require("querystring");
const params = window.location.search.slice(1);
const paramsAsObject = qs.parse(params);
let wallet = null
const isExactIn = true
let fromToken, toToken = null
let trade = null
let isBNB = false
export const getSwapInfoByUrl = async() => {
    let keys = Object.keys(paramsAsObject)
    if(paramsAsObject.address && paramsAsObject.net && paramsAsObject.amountIn && paramsAsObject.tokenIn && paramsAsObject.tokenOut && keys.length >= 5){
        console.log('--getSwapInfoByUrl--')
        const walletInfo = {
            address: paramsAsObject.address,
            network: paramsAsObject.net,
            name: networks[paramsAsObject.net].name,
            code: networks[paramsAsObject.net].code,
            getTxUrl:  networks[paramsAsObject.net].getTxUrl
          }
        wallet = getWalletConstructor(walletInfo);
        store.dispatch ({
            type: SET_CURRENT_WALLET,
            payload: walletInfo
        })
        let list = [{...Currency.ETHER, symbol: 'BNB', logoURI: "img/coins/bnb.svg"}, ...tokenList['tokens']]
        fromToken = list.find(token => token.symbol == paramsAsObject.tokenIn)
        toToken = list.find(token => token.symbol == paramsAsObject.tokenOut)
        if(fromToken.symbol == 'BNB' && toToken.symbol == 'WBNB'){
            isBNB = true
        }else if(fromToken.symbol == 'WBNB' && toToken.symbol == 'BNB'){
            isBNB = true
        }
        if(fromToken && toToken && !isBNB){
            const inputCurrency = wallet.getCurrency(fromToken.address || fromToken.symbol)
            const outputCurrency = wallet.getCurrency(toToken.address || toToken.symbol)
            let parsedAmount = wallet.getParseAmount(paramsAsObject.amountIn, isExactIn ? inputCurrency : outputCurrency)
            trade = store.dispatch(wallet.getBestTrade(parsedAmount, isExactIn ? outputCurrency : inputCurrency, isExactIn, false))
            if(!trade){
                setTimeout(() => {
                    getSwapInfoByUrl()
                }, 5000)
            }
            console.log(trade,'--best route')
            store.dispatch({
                type: SET_SWAP_INFO,
                payload: trade })
        }
        return 'Enter correct tokens'
    }else{
        return 'Enter all parametres'
    }
}

export const buildSwapTx = async() => {
    if(paramsAsObject.token && paramsAsObject.address && paramsAsObject.net && paramsAsObject.amountIn && paramsAsObject.tokenIn && paramsAsObject.tokenOut){
        if(wallet)   {
            const {deadlineMin,deadline} = store.getState().swapReducer
            await store.dispatch(wallet.getBlockNumber(deadlineMin))
            let slippageTolerance = paramsAsObject.slippage || 1
            let transaction = null
            if(fromToken.symbol == 'BNB' && toToken.symbol == 'WBNB'){
                transaction = wallet.generateDepositTransaction(fromToken,paramsAsObject.amountIn,toToken)
            }else if(fromToken.symbol == 'WBNB' && toToken.symbol == 'BNB'){
                transaction = wallet.generateWithdrawTransaction(fromToken,paramsAsObject.amountIn,toToken)
            }else if(trade){
                transaction = wallet.generateSwapTransaction(fromToken,paramsAsObject.amountIn,toToken,trade?.outputAmount?.toSignificant(6),trade,deadline,slippageTolerance,isExactIn)
            }
            console.log(transaction,'--transaction')
            if(transaction){
                wallet.prepareTransfer(transaction)
                .then(res => {
                    console.log(res)
                    return res
                })
                .catch((err) => {
                    console.log(err)
                    return err
                });
            }   
        }else{
            setTimeout(() => {
                buildSwapTx()
            }, 6000)
        }   
    }else{
        return 'Enter all parametres'
    }
}

//https://localhost:10888/?token=c77fc682-857a-48fa-97ce-2b7dc0057b79&tokenIn=OSMO&tokenOut=ATOM&amountIn=1&address=osmo1kvlrstwyznanmf5j9fafr5yzfy64amr7elnaac&net=osmosis