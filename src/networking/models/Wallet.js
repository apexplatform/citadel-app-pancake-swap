import useApi from '../api/useApi';
import {ImplementationError,NetworkError} from './Errors'
import { DecUtils, Dec, Int } from '@keplr-wallet/unit';
import {calcSpotPrice} from '../../store/utils/math'
const api = useApi('wallet')
import store from '../../store/store';
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
        transaction: params,
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
  generateBaseTransaction(){
    const {auth_token} = store.getState().userReducer
    const {toAddress,amount} = store.getState().walletReducer;
    const body =
      {
        "from": this.address,
        "toAddress": toAddress,
        "amount": amount,
        "network": this.network,
        "publicKey": this.publicKey,
        "fee": "0.0001575",
        "gasPrice": "5000000000",
        "token": auth_token
      }
        return body
  }    
  calculateSlippageTokenIn(spotPriceBefore, tokenIn, slippage) {
		const effectivePrice = spotPriceBefore.mul(slippage.add(new Dec(1)));
		return new Dec(tokenIn).quo(effectivePrice).truncate();
	}
  generateSwapTransaction(){
    const {auth_token} = store.getState().userReducer
    const {fromTokenAmount,fromToken,toToken} = store.getState().walletReducer;
    const {slippageTolerance,rate} = store.getState().swapReducer
    const maxSlippageDec = new Dec(slippageTolerance).quo(DecUtils.getPrecisionDec(2));
		const tokenOutMinAmount = maxSlippageDec.equals(new Dec(0))
			? new Int(1)
			: this.calculateSlippageTokenIn(
          new Dec(rate),
					new Dec(fromTokenAmount.toString()).mul(DecUtils.getPrecisionDec(6)).truncate(),
					maxSlippageDec
			  );
    const dec_amount = new Dec(fromTokenAmount).mul(DecUtils.getPrecisionDec(6)).truncate();
    const body =    
    {
      "fee": {
        "gas": "650000",
        "amount": [
          {
            "denom": toToken.denom,
            "amount": "0"
          }
        ]
      },
      "msgs": [
        {
          "type": "osmosis/gamm/swap-exact-amount-in",
          "value": {
            "sender": this.address,
            "routes": [
              {
                "poolId": "1",
                "tokenOutDenom": toToken.denom
              }
            ],
            "tokenIn": {
              "denom": fromToken?.denom,
              "amount": dec_amount.toString()
            },
            "tokenOutMinAmount": tokenOutMinAmount.toString()
          }
        }
      ],
      "memo": "",
      "token": auth_token
    }
    return body
  }  
}

// {"INPUT":{"numerator":[623412160,24701035],"denominator":[660865024,931322574],"currency":{"decimals":18,"symbol":"BNB","name":"BNB"}},
// "OUTPUT":{"numerator":[186275704,1033314786,9],"denominator":[660865024,931322574],"currency":{"decimals":18,"symbol":"BUSD","name":"BUSD Token","chainId":56,"address":"0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56","tokenInfo":{"name":"BUSD Token","symbol":"BUSD","address":"0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56","chainId":56,"decimals":18,"logoURI":"https://pancakeswap.finance/images/tokens/0xe9e7cea3dedca5984780bafc599bd69add087d56.png"},"tags":[]},"token":{"decimals":18,"symbol":"BUSD","name":"BUSD Token","chainId":56,"address":"0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56","tokenInfo":{"name":"BUSD Token","symbol":"BUSD","address":"0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56","chainId":56,"decimals":18,"logoURI":"https://pancakeswap.finance/images/tokens/0xe9e7cea3dedca5984780bafc599bd69add087d56.png"},"tags":[]}}}