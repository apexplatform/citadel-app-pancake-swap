import { ValidationError } from './Errors';
import {getWalletConstructor} from '../../store/actions/walletActions'
const networks = {
    eth: {
        name: 'Ethereum', code: 'ETH'
    },
    bsc: {
        name: 'Binance Smart Chain', code: 'BNB'
    },
    cosmos: {
        name: 'COSMOS', code: 'ATOM'
    }
}
export class WalletList {
    getWallets(){
        try{
            const qs = require('querystring');
            const params = window.location.search.slice(1);
            const paramsAsObject = qs.parse(params);
            let arr = JSON.parse(paramsAsObject.wallets)
            let wallets = arr.length ? eval(paramsAsObject.wallets).map(item => {
                return {
                    address: item?.address,
                    network: item?.net,
                    name: networks[item?.net].name,
                    code: networks[item?.net].code
                }
            }) : new ValidationError(e)
            return wallets
        }catch(e){
            return new ValidationError(e)
        }
     
    }
    loadWalletsWithBalances(){
        const wallets = this.getWallets()
        if(wallets instanceof ValidationError){
            return wallets
        }
        try{
            if(wallets.length > 0){
                wallets.forEach(async item => {
                    const wallet = getWalletConstructor(item)
                    if(wallet){
                        let response = await wallet.getWalletBalance()
                        if(response.ok){
                            item.balance = response.data
                        }
                    } 
                })
            }
        }catch{}
        return wallets
    }
    
}

// https://localhost:10888/?token=ccace86f-d539-4c34-a365-9711edf629eb&wallets=[%220x4dd28bee5135fc5dbb358a68ba941a5bf8e7aab2%22]