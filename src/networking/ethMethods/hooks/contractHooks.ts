import ERC20_ABI from '../constants/abis/erc20.json'
import { ethers } from 'ethers'
import { simpleRpcProvider } from '../../utils/providers'
import { chainId } from '../constants'
import multiCallAbi from '../constants/abis/Multicall.json'
const getContract = (address: string,abi: any) => {
  return new ethers.Contract(address, abi, simpleRpcProvider)
}
// returns null on errors
function useContract(addressOrAddressMap: any | undefined, ABI: any): any {
  if (!addressOrAddressMap || !ABI) return null
  let address: string | any
  if (typeof addressOrAddressMap === 'string') address = addressOrAddressMap
  else address = addressOrAddressMap[chainId]
  try {
    return getContract(address, ABI)
  } catch (error) {
    console.error('Failed to get contract', error)
    return null
  }
}

export function useTokenContract(tokenAddress?: string) {
  return useContract(tokenAddress, ERC20_ABI)
}

export function useMulticallContract() {
  return useContract('0xeefba1e63905ef1d7acba5a8513c70307c1ce441', multiCallAbi)
}
