import useApi from '../api/useApi';
import {ImplementationError,NetworkError} from './Errors'
const api = useApi('wallet')

export default class Wallet {
    constructor(opts) {
        this.net = opts.network;
        this.name = opts.name;
        this.code = opts.code;
        this.address = opts.address;
        this.publicKey = opts.publicKey || null; 
    }

    async getDelegationBalance() {
        const data = await api.getDelegationBalance({
          network: this.net,
          address: this.address,
        });
        if (!data.ok) {
          return new NetworkError(data.error.message);
        }
        return data;
    }
    async prepareTransfer(params) {
        const data = await api.prepareBaseTransfer({
          network: this.net,
          from: this.address,
          ...params,
        });
        if (data.ok) {
          return data;
        } else {
          return new NetworkError(data.error.message);
        }
      } 
      prepareClaimRewards() {
        return new ImplementationError('Method not implemented!')
    }
}