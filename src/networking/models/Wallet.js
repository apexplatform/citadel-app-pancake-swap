import { getApi } from '../api/useApi';
import { ImplementationError, NetworkError } from './Errors'
import { store } from '../../store/store';
import * as Sentry from "@sentry/react";
const api = getApi('wallet')
const apiTransactions = getApi('transactions')
const apiSocket = getApi("socket");
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
      const data = await api.prepareBaseTransfer({
        network: this.net,
        from: this.address,
        transaction: {...params, token: auth_token},
      });
      if (data.ok) {
        return data;
      } else {
        if(data.error.error_type === 'network_error') return new NetworkError(data.error?.message);
        Sentry.captureException(data.error?.message);
        return new Error(data.error?.message);
      }
    } 
  async getTransactions() {
    const {auth_token} = store.getState().user
    const params = {
      auth_token,
      address: this.address,
      net: this.net
    }
    const data = await apiTransactions.getTransactions(params);
    if (data.ok) {
      return data;
    } else {
      if(data.error.error_type === 'network_error') return new NetworkError(data.error?.message);
      Sentry.captureException(data.error?.message);
      return new Error(data.error?.message);  
    }
  } 
  prepareClaimRewards() {
    return new ImplementationError('Method not implemented!')
  }  
  async getWalletBalance() {
    const {auth_token} = store.getState().user
    try{
      const data = await api.getWalletBalance({
        network: this.net,
        address: this.address,
        token: auth_token
      });
      if (data.ok) {
        return data;
      } else {
        if(data.error.error_type === 'network_error') return new NetworkError(data.error?.message);
        Sentry.captureException(data.error?.message);
        return null;
      }
    }catch{
      return null;
    }
  } 
  async sendCustomMessage(type,message) {
    const { auth_token, socket_token } = store.getState().user;
    const data = await apiSocket.sendCustomMessage({
      data: {
        to: 'main-front',
        from: auth_token,
        toDeviceId: socket_token,
        type,
        message
      },
      token: auth_token,
    });
    if (data.ok) {
      return data;
    } else {
      Sentry.captureException(data.error?.message);
      if (data.error?.error_type === "network") return new NetworkError(data.error?.message);
      return new Error(data.error?.message);
    }
  } 
}