import { ValidationError } from './Errors';
import { walletActions } from '../../store/actions'
import { networks } from './network.js'
export class WalletList {
    getWallets(){
        try{
            const qs = require('querystring');
            const params = window.location.search.slice(1);
            const paramsAsObject = qs.parse(params);
            let arr = JSON.parse(paramsAsObject.wallets)
            // eslint-disable-next-line
            let wallets = arr.length ? eval(paramsAsObject.wallets).map(item => {
                return {
                    address: item?.address,
                    network: item?.net,
                    name: networks[item?.net]?.name,
                    code: networks[item?.net]?.code,
                    publicKey: item?.publicKey,
                    getTxUrl:  networks[item?.net]?.getTxUrl
                }
            }) : new ValidationError()
            return wallets
        }catch(e){
            return new ValidationError(e)
        }
     
    }
    async loadWalletsWithBalances(){
        const wallets = this.getWallets()
        if(wallets instanceof ValidationError){
            return wallets
        }
        try{
            if(wallets.length > 0){
                wallets.forEach(async (item,i) => {
                    const wallet = walletActions.getWalletConstructor(item)
                    if(wallet){
                        let response = await wallet.getWalletBalance()
                        if(response.ok){
                            item.balance = response.data.mainBalance
                        }else{
                            response = await wallet.getWalletBalance()
                            item.balance = response?.data?.mainBalance
                        }
                    } 
                })
            }
        }catch{}
        return wallets
    }
    
}

