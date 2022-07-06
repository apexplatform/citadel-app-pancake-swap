/* eslint-disable no-param-reassign */
import { Currency, ETHER, Token } from '@pancakeswap/sdk'
import {
  TokenAddressMap,
  getDefaultTokenList,
  getUnsupportedTokenList,
  getCombinedActiveList,
  getCombinedInactiveList,
} from './lists.ts'
import { getAddress } from '@ethersproject/address'

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
// reduce token map into standard address <-> Token mapping, optionally include getr added tokens
function getTokensFromMap(tokenMap: TokenAddressMap, includegetrAdded: boolean): { [address: string]: Token } {
  const chainId = 56
    if (!chainId) return {}

    // reduce to just tokens
    const mapWithoutUrls = Object.keys(tokenMap[chainId]).reduce<{ [address: string]: Token }>((newMap, address) => {
      newMap[address] = tokenMap[chainId][address].token
      return newMap
    }, {})
    return mapWithoutUrls
}

export function getDefaultTokens(): { [address: string]: Token } {
  const defaultList = getDefaultTokenList()
  return getTokensFromMap(defaultList, false)
}

export function getAllTokens(): { [address: string]: Token } {
  const allTokens = getCombinedActiveList()
  return getTokensFromMap(allTokens, true)
}

export function getAllInactiveTokens(): { [address: string]: Token } {
  // get inactive tokens
  const inactiveTokensMap = getCombinedInactiveList()
  const inactiveTokens = getTokensFromMap(inactiveTokensMap, false)

  // filter out any token that are on active list
  const activeTokensAddresses = Object.keys(getAllTokens())
  const filteredInactive = activeTokensAddresses
    ? Object.keys(inactiveTokens).reduce<{ [address: string]: Token }>((newMap, address) => {
        if (!activeTokensAddresses.includes(address)) {
          newMap[address] = inactiveTokens[address]
        }
        return newMap
      }, {})
    : inactiveTokens

  return filteredInactive
}

export function getUnsupportedTokens(): { [address: string]: Token } {
  const unsupportedTokensMap = getUnsupportedTokenList()
  return getTokensFromMap(unsupportedTokensMap, false)
}

export function getIsTokenActive(token: Token | undefined | null): boolean {
  const activeTokens = getAllTokens()

  if (!activeTokens || !token) {
    return false
  }

  return !!activeTokens[token.address]
}

// getd to detect extra search results
export function getFoundOnInactiveList(searchQuery: string): Token[] | undefined {
  const chainId = 56
  const inactiveTokens = getAllInactiveTokens()
    if (!chainId || searchQuery === '') {
      return undefined
    }
    const tokens = filterTokens(Object.values(inactiveTokens), searchQuery)
    return tokens
}


// undefined if invalid or does not exist
// null if loading
// otherwise returns the token
export function getToken(tokenAddress?: string): Token | undefined | null {
  const tokens = getAllTokens()
  const address = isAddress(tokenAddress)
  const token: Token | undefined = address ? tokens[address] : undefined
  return  token
}

export function getCurrency(currencyId: string | undefined): Currency | null | undefined {
  const isBNB = currencyId?.toUpperCase() === 'BNB'
  const token = getToken(isBNB ? undefined : currencyId)
  return isBNB ? ETHER : token
}

