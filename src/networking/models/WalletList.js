export class BSCWalletList {
    getWallets(){
        const qs = require('querystring');
        const params = window.location.search.slice(1);
        const paramsAsObject = qs.parse(params);
        let wallets = paramsAsObject.wallets ? JSON.parse(paramsAsObject.wallets).map(item => {
            return {
                address: item,
                network: 'bsc',
                name: 'Binance Smart Chain',
                code: 'BNB'
            }
        }) : []
    // let wallets = [{
    //             address: '0xa6209c8c2ddf4cd8d8bbb9df11cd0a7a19e75bdd',
    //             network: 'bsc',
    //             name: 'Binance Smart Chain',
    //             code: 'BNB'
    //         }]
        return wallets
    }
}