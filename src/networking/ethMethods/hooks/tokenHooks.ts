/* eslint-disable no-param-reassign */
import { Currency, Token, Ether, WETH9 } from '@uniswap/sdk-core'
import {
  TokenAddressMap,
  useDefaultTokenList,
  useUnsupportedTokenList,
  useCombinedActiveList,
} from './listsHooks'
import { getAddress } from '@ethersproject/address'
import { chainId } from '../constants'
import { SupportedChainId } from '../constants/chains'

export function filterTokens(tokens: Token[], search: string): Token[] {
    if (search.length === 0) return tokens
  
    const searchingAddress = isAddress(search)
  
    if (searchingAddress) {
      return tokens.filter((token) => token.address === searchingAddress)
    }
  
    const lowerSearchParts = search
      .toLowerCase()
      .split(/\s+/)
      .filter((s) => s.length > 0)
  
    if (lowerSearchParts.length === 0) {
      return tokens
    }
  
    const matchesSearch = (s: string): boolean => {
      const sParts = s
        .toLowerCase()
        .split(/\s+/)
        .filter((s_) => s_.length > 0)
  
      return lowerSearchParts.every((p) => p.length === 0 || sParts.some((sp) => sp.startsWith(p) || sp.endsWith(p)))
    }
  
    return tokens.filter((token) => {
      const { symbol, name } = token
      return (symbol && matchesSearch(symbol)) || (name && matchesSearch(name))
    })
  }
export function isAddress(value: any): string | false {
    try {
      return getAddress(value)
    } catch {
      return false
    }
  }
 
export interface ListenerOptions {
  blocksPerFetch: any
}
  
export const NEVER_RELOAD: ListenerOptions = {
  blocksPerFetch: Infinity,
}
// reduce token map into standard address <-> Token mapping, optionally include user added tokens
function useTokensFromMap(tokenMap: TokenAddressMap, includeUserAdded: boolean): { [address: string]: Token } {
    if (!chainId) return {}
    // reduce to just tokens
    const mapWithoutUrls = Object.keys(tokenMap[chainId]).reduce<{ [address: string]: Token }>((newMap, address) => {
      newMap[address] = tokenMap[chainId][address].token
      return newMap
    }, {})
    return mapWithoutUrls
}

export function useDefaultTokens(): { [address: string]: Token } {
  const defaultList = useDefaultTokenList()
  return useTokensFromMap(defaultList, false)
}

export function useAllTokens(): { [address: string]: Token } {
  const allTokens = useCombinedActiveList()
  return useTokensFromMap(allTokens, true)
}


export function useUnsupportedTokens(): { [address: string]: Token } {
  const unsupportedTokensMap = useUnsupportedTokenList()
  return useTokensFromMap(unsupportedTokensMap, false)
}

export function useIsTokenActive(token: Token | undefined | null): boolean {
  const activeTokens = useAllTokens()

  if (!activeTokens || !token) {
    return false
  }

  return !!activeTokens[token.address]
}


// undefined if invalid or does not exist
// null if loading
// otherwise returns the token
export function useToken(tokenAddress?: string): Token | undefined | null {
  const tokens = useAllTokens()

  const address = isAddress(tokenAddress)

  // const tokenContract = useTokenContract(address || undefined, false)
  // const tokenContractBytes32 = useBytes32TokenContract(address || undefined, false)
  const token: Token | undefined = address ? tokens[address] : undefined
  return  token
}
export const WETH9_EXTENDED: { [chainId: number]: Token } = {
  ...WETH9,
  [SupportedChainId.OPTIMISM]: new Token(
    SupportedChainId.OPTIMISM,
    '0x4200000000000000000000000000000000000006',
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [SupportedChainId.OPTIMISTIC_KOVAN]: new Token(
    SupportedChainId.OPTIMISTIC_KOVAN,
    '0x4200000000000000000000000000000000000006',
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [SupportedChainId.ARBITRUM_ONE]: new Token(
    SupportedChainId.ARBITRUM_ONE,
    '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [SupportedChainId.ARBITRUM_RINKEBY]: new Token(
    SupportedChainId.ARBITRUM_RINKEBY,
    '0xB47e6A5f8b33b3F17603C83a0535A9dcD7E32681',
    18,
    'WETH',
    'Wrapped Ether'
  ),
}

export class ExtendedEther extends Ether {
  get wrapped(): Token {
    if (this.chainId in WETH9_EXTENDED) return WETH9_EXTENDED[this.chainId]
    throw new Error('Unsupported chain ID')
  }

  static _cachedEther: { [chainId: number]: ExtendedEther } = {}

  static onChain(chainId: number): ExtendedEther {
    return this._cachedEther[chainId] ?? (this._cachedEther[chainId] = new ExtendedEther(chainId))
  }
}

export function useCurrency(currencyId: string | undefined): Currency | null | undefined {
  const isETH = currencyId?.toUpperCase() === 'ETH'
  const token = useToken(isETH ? undefined : currencyId)
  return isETH ? ExtendedEther.onChain(chainId) : token
}

