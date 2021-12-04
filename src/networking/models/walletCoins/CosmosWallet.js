import Wallet from '../Wallet';
import { DecUtils, Dec, Int } from '@keplr-wallet/unit';
import store from '../../../store/store';
export default class CosmosWallet extends Wallet {
    constructor(opts) {
        super(opts);
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