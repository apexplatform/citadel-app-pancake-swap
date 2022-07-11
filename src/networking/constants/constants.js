import { mainnetTokens, testnetTokens } from './tokenLists/tokens.ts'
import { ChainId, JSBI, Percent } from '@pancakeswap/sdk'
export const ROUTER_ADDRESS = '0x10ED43C718714eb63d5aA57B78B54704E256024E'

export const INITIAL_ALLOWED_SLIPPAGE = 50
// used to construct intermediary pairs for trading
export const ONE_BIPS = new Percent(JSBI.BigInt(1), JSBI.BigInt(10000))
export const BASES_TO_CHECK_TRADES_AGAINST = {
  [ChainId.MAINNET]: [
    mainnetTokens.wbnb,
    mainnetTokens.cake,
    mainnetTokens.busd,
    mainnetTokens.usdt,
    mainnetTokens.btcb,
    mainnetTokens.ust,
    mainnetTokens.eth,
    mainnetTokens.usdc,
  ],
  [ChainId.TESTNET]: [testnetTokens.wbnb, testnetTokens.cake, testnetTokens.busd],
}
export const ADDITIONAL_BASES = {
  [ChainId.MAINNET]: {},
}
export const BETTER_TRADE_LESS_HOPS_THRESHOLD = new Percent(JSBI.BigInt(50), JSBI.BigInt(10000))

export const CUSTOM_BASES = {
  [ChainId.MAINNET]: {},
}

const PANCAKE_EXTENDED = 'https://tokens.pancakeswap.finance/pancakeswap-extended.json'
const PANCAKE_TOP100 = 'https://tokens.pancakeswap.finance/pancakeswap-top-100.json'
export const SPENDER = "0x10ED43C718714eb63d5aA57B78B54704E256024E"
export const UNSUPPORTED_LIST_URLS = []

// lower index == higher priority for token import
export const DEFAULT_LIST_OF_LISTS = [
  PANCAKE_TOP100,
  PANCAKE_EXTENDED,
  ...UNSUPPORTED_LIST_URLS, // need to load unsupported tokens as well
]

// default lists to be 'active' aka searched across
export const DEFAULT_ACTIVE_LIST_URLS = []
