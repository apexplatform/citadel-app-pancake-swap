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
    const {fromTokenAmount,toToken} = store.getState().walletReducer;
    const {tokenIn,poolInfo} = store.getState().swapReducer
    const maxSlippage = '1'
    const maxSlippageDec = new Dec(maxSlippage).quo(DecUtils.getPrecisionDec(2));
    const dec_amount = new Dec(fromTokenAmount).mul(DecUtils.getPrecisionDec(6)).truncate();
    const tokenWeightIn = new Dec(store.getState().swapReducer.tokenIn?.weight)
    const tokenWeightOut = new Dec(store.getState().swapReducer.tokenOut?.weight)
    const tokenBalanceIn = new Dec(store.getState().swapReducer.tokenIn?.token?.amount)
    const tokenBalanceOut = new Dec(store.getState().swapReducer.tokenOut?.token?.amount)
    const outSpotPrice = calcSpotPrice(tokenBalanceIn,tokenWeightIn,tokenBalanceOut,tokenWeightOut,new Dec(poolInfo?.poolParams?.swapFee))
		const tokenOutMinAmount = maxSlippageDec.equals(new Dec(0))
			? new Int(1)
			: this.calculateSlippageTokenIn(
          outSpotPrice,
					new Dec(fromTokenAmount.toString()).mul(DecUtils.getPrecisionDec(6)).truncate(),
					maxSlippageDec
			  );
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
              "denom": tokenIn?.token?.denom,
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