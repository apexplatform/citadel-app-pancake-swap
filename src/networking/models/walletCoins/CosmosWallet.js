import Wallet from '../Wallet';
import { getApi } from '../../api/useApi';
export default class CosmosWallet extends Wallet {
    async getStakeList(){
        const api = getApi('restake', process.env.REACT_APP_RESTAKE_URL)
        try{
            const response = await api.getValidators({net: this.net, address: this.address});
            return response.data
        }catch(e){
            return null
        }
    }
    async getDelegatorStatus(){
        const api = getApi('restake', process.env.REACT_APP_RESTAKE_URL)
        try{
            const response = await api.getDelegatorStatus({net: this.net, address: this.address});
            return response.data
        }catch(e){
            console.log(e)
            return null
        }
    }
    async getBalances(){
        const api = getApi('restake', process.env.REACT_APP_RESTAKE_URL)
        try{
            const response = await api.getBalances({net: this.net, address: this.address});
            return response.data
        }catch(e){
            console.log(e)
            return null
        }
    }
    async getNetworkConfig(){
        const api = getApi('restake', process.env.REACT_APP_RESTAKE_URL)
        try{
            const response = await api.getNetworkConfig(this.net);
            return response
        }catch(e){
            console.log(e)
            return null
        }
    }
    async setPermissionRestake(data){
        const api = getApi('restake', process.env.REACT_APP_RESTAKE_URL)
        try{
            const response = await api.postPermissionRestake({net: this.net, address: this.address, transaction: data});
            return response
        }catch(e){
            return new Error(e?.message)
        }
    }
    async deleteRestakeAddress(){
        const api = getApi('restake', process.env.REACT_APP_RESTAKE_URL)
        try{
            const response = await api.deleteRestakeAddress({net: this.net, address: this.address});
            return response.data
        }catch(e){
            console.log(e)
        }
    }
}