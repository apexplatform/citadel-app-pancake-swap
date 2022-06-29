import { getRequest } from '../requests/getRequest';
import { ImplementationError, NetworkError } from './Errors'
import { store } from '../../store/store';
import * as Sentry from "@sentry/react";
import { utils } from '@citadeldao/apps-sdk';

const requestManager = new utils.RequestManager()
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
      const data = await requestManager.send(walletRequest.prepareBaseTransfer({
        network: this.net,
        from: this.address,
        transaction: {...params, token: auth_token},
      }));
      if (data.ok) {
        return data;
      } else {
        if(data.error?.error_type === 'network_error') return new NetworkError(data.error?.message || data?.error);
        Sentry.captureException(data.error?.message || data?.error);
        return new Error(data.error?.message || data?.error);  
      }
    } 
  async getTransactions() {
    const {auth_token} = store.getState().user
    const params = {
      auth_token,
      address: this.address,
      net: this.net
    }
    const data = await requestManager.send(transactionsRequest.getTransactions(params));
    if (data.ok) {
      return data;
    } else {
      if(data.error?.error_type === 'network_error') return new NetworkError(data.error?.message || data?.error);
      Sentry.captureException(data.error?.message || data?.error);
      return new Error(data.error?.message || data?.error);  
    }
  } 
  prepareClaimRewards() {
    return new ImplementationError('Method not implemented!')
  }  
  async getWalletBalance() {
    const {auth_token} = store.getState().user
    try{
      const data = await requestManager.send(walletRequest.getWalletBalance({
        network: this.net,
        address: this.address,
        token: auth_token
      }));
      if (data.ok) {
        return data;
      } else {
        if(data.error?.error_type === 'network_error') return new NetworkError(data.error?.message || data?.error);
        Sentry.captureException(data.error?.message || data?.error);
        return null;
      }
    }catch{
      return null;
    }
  } 
  async sendCustomMessage(type,message) {
    const { auth_token, socket_token } = store.getState().user;
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
    if (data.ok) {
      return data;
    } else {
      if(data.error?.error_type === 'network_error') return new NetworkError(data.error?.message || data?.error);
      Sentry.captureException(data.error?.message || data?.error);
      return new Error(data.error?.message || data?.error);  
    }
  } 
}