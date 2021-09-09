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

export let tokens = [
	{
		label: 'ETH',
		value: 'eth',
		amount: 23423
	},
	{
		label: 'USDT',
		value: 'usdt',
		amount: 230
	}
]

export const addresses = [
	{
		address: "cosmos34564rthtgrfedw42434",
		amount: 231,
		network: 'cosmos',
		name: 'Cosmos One Seed'
	},
	{
		address: "cosmos34vbfdsfgbvfdfvgbfd",
		amount: 443,
		network: 'cosmos',
		name: 'Cosmos One Seed'
	},
	{
		address: "cosmos23456yhtgrfedfgfedsdf",
		amount: 34,
		network: 'cosmos',
		name: 'Cosmos One Seed'
	}
]