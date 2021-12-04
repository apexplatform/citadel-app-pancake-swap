import { Currency, Token } from '@uniswap/sdk-core'
import { TokenInfo, TokenList } from '@uniswap/token-lists'

import { isAddress } from '@ethersproject/address'

type TagDetails = any
interface TagInfo extends TagDetails {
  id: string
}
/**
 * Token instances created from token info on a token list.
 */
export class WrappedTokenInfo implements Token {
  isNative: false = false
  isToken: true = true
  list: TokenList

  tokenInfo: TokenInfo

  constructor(tokenInfo: TokenInfo, list: TokenList) {
    this.tokenInfo = tokenInfo
    this.list = list
  }

  _checksummedAddress: string | null = null

  get address(): string {
    if (this._checksummedAddress) return this._checksummedAddress
    const checksummedAddress = isAddress(this.tokenInfo.address)
    if (!checksummedAddress) throw new Error(`Invalid token address: ${this.tokenInfo.address}`)
    return this.tokenInfo.address
  }

  get chainId(): number {
    return this.tokenInfo.chainId
  }

  get decimals(): number {
    return this.tokenInfo.decimals
  }

  get name(): string {
    return this.tokenInfo.name
  }

  get symbol(): string {
    return this.tokenInfo.symbol
  }

  get logoURI(): string | undefined {
    return this.tokenInfo.logoURI
  }

  _tags: TagInfo[] | null = null
  get tags(): TagInfo[] {
    if (this._tags !== null) return this._tags
    if (!this.tokenInfo.tags) return (this._tags = [])
    const listTags = this.list.tags
    if (!listTags) return (this._tags = [])

    return (this._tags = this.tokenInfo.tags.map((tagId) => {
      return {
        ...listTags[tagId],
        id: tagId,
      }
    }))
  }

  equals(other: Currency): boolean {
    return other.chainId === this.chainId && other.isToken && other.address.toLowerCase() === this.address.toLowerCase()
  }

  sortsBefore(other: Token): boolean {
    if (this.equals(other)) throw new Error('Addresses should not be equal')
    return this.address.toLowerCase() < other.address.toLowerCase()
  }

  get wrapped(): Token {
    return this
  }
}
