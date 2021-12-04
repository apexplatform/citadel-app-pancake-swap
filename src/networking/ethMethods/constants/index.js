import { SupportedChainId } from './chains'
import { Percent } from '@uniswap/sdk-core'
import JSBI from 'jsbi'
import {WETH9_EXTENDED} from '../hooks/tokenHooks'
import {
  AMPL,
  DAI,
  DAI_ARBITRUM_ONE,
  DAI_OPTIMISM,
  ETH2X_FLI,
  FEI,
  FRAX,
  FXS,
  renBTC,
  TRIBE,
  USDC,
  USDT,
  USDT_ARBITRUM_ONE,
  USDT_OPTIMISM,
  WBTC,
  WBTC_ARBITRUM_ONE,
  WBTC_OPTIMISM
} from './tokens'
export const ROUTER_ADDRESS = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'
export const INITIAL_ALLOWED_SLIPPAGE = 50
// used to construct intermediary pairs for trading
export const ONE_BIPS = new Percent(JSBI.BigInt(1), JSBI.BigInt(10000))
export const WETH_ONLY = Object.fromEntries(
  Object.entries(WETH9_EXTENDED).map(([key, value]) => [key, [value]])
)
export const ONE_HUNDRED_PERCENT = new Percent(JSBI.BigInt(10000), JSBI.BigInt(10000))
export const ZERO_PERCENT = new Percent('0')
export const BASES_TO_CHECK_TRADES_AGAINST = {
  ...WETH_ONLY,
  [SupportedChainId.MAINNET]: [...WETH_ONLY[SupportedChainId.MAINNET], DAI, USDC, USDT, WBTC],
  [SupportedChainId.OPTIMISM]: [...WETH_ONLY[SupportedChainId.OPTIMISM], DAI_OPTIMISM, USDT_OPTIMISM, WBTC_OPTIMISM],
  [SupportedChainId.ARBITRUM_ONE]: [
    ...WETH_ONLY[SupportedChainId.ARBITRUM_ONE],
    DAI_ARBITRUM_ONE,
    USDT_ARBITRUM_ONE,
    WBTC_ARBITRUM_ONE,
  ],
}
export const ADDITIONAL_BASES = {
  [SupportedChainId.MAINNET]: {
    '0xF16E4d813f4DcfDe4c5b44f305c908742De84eF0': [ETH2X_FLI],
    [FEI.address]: [TRIBE],
    [TRIBE.address]: [FEI],
    [FRAX.address]: [FXS],
    [FXS.address]: [FRAX],
    [WBTC.address]: [renBTC],
    [renBTC.address]: [WBTC],
  },
}
/**
 * Some tokens can only be swapped via certain pairs, so we override the list of bases that are considered for these
 * tokens.
 */
export const CUSTOM_BASES = {
  [SupportedChainId.MAINNET]: {
    [AMPL.address]: [DAI, WETH9_EXTENDED[SupportedChainId.MAINNET]],
  },
}

export const BETTER_TRADE_LESS_HOPS_THRESHOLD = new Percent(JSBI.BigInt(50), JSBI.BigInt(10000))
export const chainId = 1


export const SPENDER = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'