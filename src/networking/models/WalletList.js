import { ValidationError } from './Errors';
const networks = {
    eth: {
        name: 'Ethereum', code: 'ETH'
    },
    bsc: {
        name: 'Binance Smart Chain', code: 'BNB'
    },
    cosmos: {
        name: 'COSMOS', code: 'ATOM'
    },
    secret: {
        name: 'Secret', code: 'SCRT'
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
}

