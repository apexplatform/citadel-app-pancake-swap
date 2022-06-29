import Wallet from '../Wallet';
import { getRequest } from '../../requests/getRequest';
import { utils } from '@citadeldao/apps-sdk';

const requestManager = new utils.RequestManager()
const restakeRequest = getRequest('restake')
export default class CosmosWallet extends Wallet {
    async getStakeList(){
        try{
            const response = await requestManager.send(restakeRequest.getValidators({net: this.net, address: this.address}));
            return response.data
        }catch(e){
            return null
        }
    }
    async getDelegatorStatus(){
        try{
            const response = await requestManager.send(restakeRequest.getDelegatorStatus({net: this.net, address: this.address}));
            return response.data
        }catch(e){
            console.log(e)
            return null
        }
    }
    async getBalances(){
        try{
            const response = await requestManager.send(restakeRequest.getBalances({net: this.net, address: this.address}));
            return response.data
        }catch(e){
            console.log(e)
            return null
        }
    }
    async getNetworkConfig(){
        try{
            const response = await requestManager.send(restakeRequest.getNetworkConfig(this.net));
            return response
        }catch(e){
            console.log(e)
            return null
        }
    }
    async setPermissionRestake(data){
        try{
            const response = await requestManager.send(restakeRequest.postPermissionRestake({net: this.net, address: this.address, transaction: data}));
            return response
        }catch(e){
            return new Error(e?.message)
        }
    }
    async deleteRestakeAddress(){
        try{
            const response = await requestManager.send(restakeRequest.deleteRestakeAddress({net: this.net, address: this.address}));
            return response.data
        }catch(e){
            console.log(e)
        }
    }
}