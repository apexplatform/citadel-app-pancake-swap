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
		amount: 2.3,
		network: 'bsc',
		name: 'Binance Smart Chain',
		code: 'BSC',
		publicKey: "0229cf4f3c561133c6d0213b02cbe920238bb06e75a3c46a8b124bc6f2f50f3673"
	},
	{
		address: "0xa6209c8c2ddf4cd8d8bbb9df11cd0a7a19e75bdd",
		amount: 4.4,
		network: 'bsc',
		name: 'Binance Smart Chain',
		code: 'BSC',
		publicKey: "af9ade0dc914dad55e3d98b08aa4dd3c386fdc50f7c8c81773137ddfa8386486ddda5e6cfeff5aac4dbbd91df9a52b19710a726f37af84f30f25f182e9937d14"
	}
]