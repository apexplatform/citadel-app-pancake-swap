import {makeIBCMinimalDenom} from './utils/ibc'
export const swapPools = [
    {
        poolId: '1',
        currencies: [
            {
                coinMinimalDenom: makeIBCMinimalDenom('channel-0','uatom'),
                coinDenom: 'ATOM',
                coinDecimals: 6,
            },
            {
                coinMinimalDenom: 'uosmo',
                coinDenom: 'OSMO',
                coinDecimals: 6,
            },
        ],
    },
    {
        poolId: '2',
        currencies: [
            {
                coinMinimalDenom: 'uosmo',
                coinDenom: 'OSMO',
                coinDecimals: 6,
            },
            {
                coinMinimalDenom: 'uion',
                coinDenom: 'ION',
                coinDecimals: 6,
            },
        ],
    },
    {
        poolId: '3',
        currencies: [
            {
                coinMinimalDenom: 'uosmo',
                coinDenom: 'OSMO',
                coinDecimals: 6,
            },
            {
                coinMinimalDenom: makeIBCMinimalDenom('channel-1','uakt'),
                coinDenom: 'AKT',
                coinDecimals: 6,
            },
        ],
    },
    {
        poolId: '4',
        currencies: [
            {
                coinMinimalDenom: makeIBCMinimalDenom('channel-0','uatom'),
                coinDenom: 'ATOM',
                coinDecimals: 6,
            },
            {
                coinMinimalDenom: makeIBCMinimalDenom('channel-1','uakt'),
                coinDenom: 'AKT',
                coinDecimals: 6,
            },
        ],
    },
    {
        poolId: '5',
        currencies: [
            {
                coinMinimalDenom: 'uosmo',
                coinDenom: 'OSMO',
                coinDecimals: 6,
            },
            {
                coinMinimalDenom: makeIBCMinimalDenom('channel-2','udvpn'),
                coinDenom: 'DVPN',
                coinDecimals: 6,
            },
        ],
    },
    {
        poolId: '6',
        currencies: [
            {
                coinMinimalDenom: makeIBCMinimalDenom('channel-0','uatom'),
                coinDenom: 'ATOM',
                coinDecimals: 6,
            },
            {
                coinMinimalDenom: makeIBCMinimalDenom('channel-2','udvpn'),
                coinDenom: 'DVPN',
                coinDecimals: 6,
            },
        ],
    },
    {
        poolId: '7',
        currencies: [
            {
                coinMinimalDenom: 'uosmo',
                coinDenom: 'OSMO',
                coinDecimals: 6,
            },
            {
                coinMinimalDenom: makeIBCMinimalDenom('channel-6','uiris'),
                coinDenom: 'IRIS',
                coinDecimals: 6,
            },
        ],
    },
    {
        poolId: '8',
        currencies: [
            {
                coinMinimalDenom: makeIBCMinimalDenom('channel-0','uatom'),
                coinDenom: 'ATOM',
                coinDecimals: 6,
            },
            {
                coinMinimalDenom: makeIBCMinimalDenom('channel-6','uiris'),
                coinDenom: 'IRIS',
                coinDecimals: 6,
            },
        ],
    },
    {
        poolId: '9',
        currencies: [
            {
                coinMinimalDenom: 'uosmo',
                coinDenom: 'OSMO',
                coinDecimals: 6,
            },
            {
                coinMinimalDenom: makeIBCMinimalDenom('channel-5','basecro'),
                coinDenom: 'CRO',
                coinDecimals: 8,
            },
        ],
    },
    {
        poolId: '10',
        currencies: [
            {
                coinMinimalDenom: makeIBCMinimalDenom('channel-0','uatom'),
                coinDenom: 'ATOM',
                coinDecimals: 6,
            },
            {
                coinMinimalDenom: makeIBCMinimalDenom('channel-5','basecro'),
                coinDenom: 'CRO',
                coinDecimals: 8,
            },
        ],
    },
    {
        poolId: '13',
        currencies: [
            {
                coinMinimalDenom: makeIBCMinimalDenom('channel-0','uatom'),
                coinDenom: 'ATOM',
                coinDecimals: 6,
            },
            {
                coinMinimalDenom: makeIBCMinimalDenom('channel-4','uxprt'),
                coinDenom: 'XPRT',
                coinDecimals: 6,
            },
        ],
    },
    {
        poolId: '22',
        currencies: [
            {
                coinMinimalDenom: makeIBCMinimalDenom('channel-0','uatom'),
                coinDenom: 'ATOM',
                coinDecimals: 6,
            },
            {
                coinMinimalDenom: makeIBCMinimalDenom('channel-8','uregen'),
                coinDenom: 'REGEN',
                coinDecimals: 6,
            },
        ],
    },
    {
        poolId: '183',
        currencies: [
            {
                coinMinimalDenom: makeIBCMinimalDenom('channel-0','uatom'),
                coinDenom: 'ATOM',
                coinDecimals: 6,
            },
            {
                coinMinimalDenom: makeIBCMinimalDenom('channel-15','uiov'),
                coinDenom: 'IOV',
                coinDecimals: 6,
            },
        ],
    },
    {
        poolId: '461',
        currencies: [
            {
                coinMinimalDenom: makeIBCMinimalDenom('channel-37','ungm'),
                coinDenom: 'NGM',
                coinDecimals: 6,
            },
            {
                coinMinimalDenom: makeIBCMinimalDenom('channel-37','eeur'),
                coinDenom: 'EEUR',
                coinDecimals: 6,
            },
        ],
    },
    {
        poolId: '481',
        currencies: [
            {
                coinMinimalDenom: 'uosmo',
                coinDenom: 'OSMO',
                coinDecimals: 6,
            },
            {
                coinMinimalDenom: makeIBCMinimalDenom('channel-37','eeur'),
                coinDenom: 'EEUR',
                coinDecimals: 6,
            },
        ],
    },
    {
        poolId: '482',
        currencies: [
            {
                coinMinimalDenom: makeIBCMinimalDenom('channel-0','uatom'),
                coinDenom: 'ATOM',
                coinDecimals: 6,
            },
            {
                coinMinimalDenom: makeIBCMinimalDenom('channel-37','eeur'),
                coinDenom: 'EEUR',
                coinDecimals: 6,
            },
        ],
    },
]


export const IBCAssetInfos = [
	{
		counterpartyChainId: 'cosmoshub-4',
		sourceChannelId: 'channel-0',
		destChannelId: 'channel-141',
		coinMinimalDenom: 'uatom',
	},
	{
		counterpartyChainId: 'akashnet-2',
		sourceChannelId: 'channel-1',
		destChannelId: 'channel-9',
		coinMinimalDenom: 'uakt',
	},
	{
		counterpartyChainId: 'regen-1',
		sourceChannelId: 'channel-8',
		destChannelId: 'channel-1',
		coinMinimalDenom: 'uregen',
	},
	{
		counterpartyChainId: 'sentinelhub-2',
		sourceChannelId: 'channel-2',
		destChannelId: 'channel-0',
		coinMinimalDenom: 'udvpn',
	},
	{
		counterpartyChainId: 'core-1',
		sourceChannelId: 'channel-4',
		destChannelId: 'channel-6',
		coinMinimalDenom: 'uxprt',
	},
	{
		counterpartyChainId: 'irishub-1',
		sourceChannelId: 'channel-6',
		destChannelId: 'channel-3',
		coinMinimalDenom: 'uiris',
	},
	{
		counterpartyChainId: 'crypto-org-chain-mainnet-1',
		sourceChannelId: 'channel-5',
		destChannelId: 'channel-10',
		coinMinimalDenom: 'basecro',
	},
	{
		counterpartyChainId: 'iov-mainnet-ibc',
		sourceChannelId: 'channel-15',
		destChannelId: 'channel-2',
		coinMinimalDenom: 'uiov',
	},
	{
		counterpartyChainId: 'emoney-3',
		sourceChannelId: 'channel-37',
		destChannelId: 'channel-0',
		coinMinimalDenom: 'ungm',
	},
	{
		counterpartyChainId: 'emoney-3',
		sourceChannelId: 'channel-37',
		destChannelId: 'channel-0',
		coinMinimalDenom: 'eeur',
	},
];