export class WalletList {
    constructor(options) {
        this.id = options.id
        this.wallets = options.wallets
    }
    getWallets(){
        return this.wallets
    }
    updateWallets(){}
}