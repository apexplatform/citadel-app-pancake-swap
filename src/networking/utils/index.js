import { L1_CHAIN_IDS } from '../ethMethods/constants/chains'

export function constructSameAddressMap(address,additionalNetworks){
  return L1_CHAIN_IDS
    .concat(additionalNetworks)
    .reduce((memo, chainId) => {
      memo[chainId] = address
      return memo
    }, {})
}
