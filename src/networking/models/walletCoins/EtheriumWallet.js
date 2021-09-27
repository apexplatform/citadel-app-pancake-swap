import Wallet from '../Wallet';
import useApi from '../../api/useApi';
const api = useApi('wallet')

export default class EtheriumWallet extends Wallet {
    constructor(opts) {
        super(opts);
    }
    prepareClaimRewards() {
        return new Error('Not implemented!')
    }
}