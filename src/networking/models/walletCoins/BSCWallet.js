import Wallet from '../Wallet';
import { eth } from '@citadeldao/apps-sdk';
import { SPENDER } from '../../constants/constants';
import MulticalABI from '../../constants/abi/Multicall.json'
export default class BSCWallet extends Wallet {
    async getTokenBalance(token) {
      const BEP20TokenContract = new eth.standards.BEP20(token.address);
      const result = await BEP20TokenContract.call("balanceOf", this.address);
      return result
    }
    async loadTokenAllowance(token) {
      const BEP20TokenContract = new eth.standards.BEP20(token.address);
      const response = await BEP20TokenContract.call('allowance', this.address, SPENDER)
      return parseInt(response?._hex || '0x0', 16)
    }
    async loadBlockNumber(deadlineMin){
      const ethContract = new eth.Contract('eth', '0xfF6FD90A470Aaa0c1B8A54681746b07AcdFedc9B', MulticalABI);
      const result = await ethContract.call('getCurrentBlockTimestamp')
      return parseInt(result?._hex, 16) + (+deadlineMin * 60)
    }
     
}