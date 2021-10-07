import Wallet from '../Wallet';
import useApi from '../../api/useApi';
const api = useApi('rewards')

export default class CosmosWallet extends Wallet {
    constructor(opts) {
        super(opts);
    }
}