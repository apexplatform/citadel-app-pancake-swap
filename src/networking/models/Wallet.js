import { getRequest } from '../requests/getRequest';
import { ImplementationError } from './Errors'
import { store } from '../../store/store';
import { utils } from '@citadeldao/apps-sdk';

const walletRequest = getRequest('wallet')
const transactionsRequest = getRequest('transactions')
const socketRequest = getRequest('socket')
export default class Wallet {
  constructor(opts) {
      this.net = opts.network;
      this.name = opts.name;
      this.code = opts.code;
      this.address = opts.address;
      this.publicKey = opts.publicKey;
  }
  async prepareTransfer(params) {
    const {auth_token} = store.getState().user
    const requestManager = new utils.RequestManager()
    const data = await requestManager.send(walletRequest.prepareBaseTransfer({
      network: this.net,
      from: this.address,
      transaction: {...params, token: auth_token},
    }));
    return data
  } 
  async getTransactions() {
    const {auth_token} = store.getState().user
    const params = {
      auth_token,
      address: this.address,
      net: this.net
    }
    const requestManager = new utils.RequestManager()
    const data = await requestManager.send(transactionsRequest.getTransactions(params));
    return data
  } 
  prepareClaimRewards() {
    return new ImplementationError('Method not implemented!')
  }  
  async getWalletBalance() {
    const {auth_token} = store.getState().user
    try{
      const requestManager = new utils.RequestManager()
      const data = await requestManager.executeRequest(walletRequest.getWalletBalance({
        network: this.net,
        address: this.address,
        token: auth_token
      }));
      return data
    }catch{
      return null;
    }
  } 
  async sendCustomMessage(type,message) {
    const { auth_token, socket_token } = store.getState().user;
    const requestManager = new utils.RequestManager()
    const data = await requestManager.send(socketRequest.sendCustomMessage({
      data: {
        to: 'main-front',
        from: auth_token,
        toDeviceId: socket_token,
        type,
        message
      },
      token: auth_token,
    }));
    return data
  } 
}