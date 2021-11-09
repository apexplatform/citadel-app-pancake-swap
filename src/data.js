export let transactions = [
	{
		id:0,
		from: 'cosmos1kvlrstwyznanmf5j9fafr5yzfy64amr73yqdt2',
		to: "0xa6209c8c2ddf4cd8d8bbb9df11cd0a7a19e75bdd",
		amount: "230",
		fee: "0.20",
        type: 'receive',
		network: 'ETH',
        date: "2021-08-30T04:05:55.644Z",
		status: false
	},
	{
		id:1,
		from: '0xa6209c8c2ddf4cd8d8bbb9df11cd0a7a19e75bdd',
		to: "0xa6209c8c2ddf4cd8d8bbb9df11cd0a7a19e75bdd",
		amount: "23230",
		fee: "0.3320",
		network: 'ETH',
        type: 'stake',
        date: "2021-07-30T04:15:55.644Z",
		status: true
	},
	{
		id:2,
		from: '0xa6209c8c2ddf4cd8d8bbb9df11cd0a7a19e75bdd',
		to: "1NQEgP11QcuHE6EMLS7spYi6D96cKyxxnN",
		amount: "-556",
		fee: "0.2240",
		network: 'ETH',
        type: 'send',
        date: "2021-08-30T03:05:55.644Z",
		status: false
	},
	{
		id:3,
		from: '0xa6209c8c2ddf4cd8d8bbb9df11cd0a7a19e75bdd',
		to: "1NQEgP11QcuHE6EMLS7spYi6D96cKyxxnN",
		amount: "55210",
		fee: "0.2240",
		network: 'ETH',
        type: 'receive',
        date: "2021-08-30T01:05:55.644Z",
		status: true
	},
	{
		id:4,
		from: '0xa6209c8c2ddf4cd8d8bbb9df11cd0a7a19e75bdd',
		to: "cosmos1kvlrstwyznanmf5j9fafr5yzfy64amr73yqdt2",
		amount: "55230",
		fee: "0.2240",
		network: 'ETH',
        type: 'stake',
        date: "2021-08-30T04:01:55.644Z",
		status: false
	}
]

export const addresses = [
	{
		address: "0x4dd28bee5135fc5dbb358a68ba941a5bf8e7aab2",
		amount: 0.03,
		network: 'bsc',
		name: 'Binance Smart Chain',
		code: 'BNB',
		publicKey: "0229cf4f3c561133c6d0213b02cbe920238bb06e75a3c46a8b124bc6f2f50f3673"
	},
	{
		address: "0xa6209c8c2ddf4cd8d8bbb9df11cd0a7a19e75bdd",
		amount: 0.19,
		network: 'bsc',
		name: 'Binance Smart Chain',
		code: 'BSC',
		publicKey: "af9ade0dc914dad55e3d98b08aa4dd3c386fdc50f7c8c81773137ddfa8386486ddda5e6cfeff5aac4dbbd91df9a52b19710a726f37af84f30f25f182e9937d14"
	}
]



// export const checkAmount = (val,name) => dispatch => {
//     const {currentWallet,fromToken,toToken} = store.getState().walletReducer
//     const {allowanceAmount,slippageTolerance,trade} = store.getState().swapReducer
//     dispatch(setAmount(val))
//     dispatch(setIndependentField(name))
//     let { priceImpactWithoutFee, realizedLPFee } = computeTradePriceBreakdown(trade)
//     const feeProcent = realizedLPFee?.toSignificant(4) || 0.001
//     const outputAmount = trade?.outputAmount?.toExact() || 0
//     let balance = 0
//     if(fromToken.symbol === 'BNB') balance = currentWallet?.balance?.mainBalance
//     if(name === 'INPUT' && fromToken.balance) balance = fromToken.balance
//     if(name === 'OUTPUT' && toToken.balance) balance = toToken.balance
//    // props.setExactIn(props.name === 'INPUT' ? true : false)
//     if(+val > 0){
//         dispatch(updateTradeInfo(val, name === 'INPUT' ? true : false))
//         dispatch(setToAmount(outputAmount))
//         if(parseInt(val) > balance){
//             dispatch(setSwapStatus('insufficientBalance'))
//         }
//         else if(parseInt(val) < +balance - feeProcent){
//             if(BigNumber(allowanceAmount).div(BigNumber(Math.pow(10,+fromToken.decimals))).toNumber() > parseInt(val) || fromToken.symbol === 'BNB'){
//                 if(parseFloat(priceImpactWithoutFee?.toFixed(2)||0) < +slippageTolerance){
//                     dispatch(setSwapStatus('swap'))
//                 }else{
//                     dispatch(setSwapStatus('swapAnyway'))
//                 }
//             } else {
//                 dispatch(setTimerApprove(true))
//                 dispatch(setSwapStatus('approve'))
//             }
//         } else {
//             dispatch(setSwapStatus('feeError'))
//         }
//     } else {
//         dispatch(setSwapStatus('enterAmount'))
//     }
// }

// 1 - Error: Returned error: insufficient funds for transfer

// 2 - Error: Returned error: operation is not available

// 3 - PancakeLibrary: INSUFFICIENT_INPUT_AMOUNT

// 4 - PancakeLibrary: INSUFFICIENT_OUTPUT_AMOUNT