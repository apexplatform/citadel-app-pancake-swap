import { ValidationError } from './Errors';
export class BSCWalletList {
    getWallets(){
        try{
            const qs = require('querystring');
            const params = window.location.search.slice(1);
            const paramsAsObject = qs.parse(params);
            let wallets = JSON.parse(paramsAsObject.wallets).map(item => {
                return {
                    address: item,
                    network: 'bsc',
                    name: 'Binance Smart Chain',
                    code: 'BNB'
                }
            })
            return wallets
        }catch(e){
            return new ValidationError(e);
        }
     
    }
}

// https://localhost:10888/?token=ccace86f-d539-4c34-a365-9711edf629eb&wallets=[%220x4dd28bee5135fc5dbb358a68ba941a5bf8e7aab2%22]