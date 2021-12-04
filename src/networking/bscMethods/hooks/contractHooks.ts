import { Contract } from '@ethersproject/contracts'
import { ChainId } from '@pancakeswap/sdk'
import { ethers } from 'ethers'
import { simpleRpcProvider } from '../../utils/providers'
import ERC20_ABI from '../constants/abi/erc20.json'
import multiCallAbi from '../constants/abi/Multicall.json'
import addresses from '../constants/contracts'

export interface Address {
  97?: any,
  56: any
}
export const getAddress = (address: Address): string => {
  const chainId = 56
  return address[chainId] ? address[chainId] : address[ChainId.MAINNET]
}

export const getMulticallAddress = () => {
  return getAddress(addresses.multiCall)
}
const getContract = (address: string,abi: any) => {
  return new ethers.Contract(address, abi, simpleRpcProvider)
}

function useContract(address: string | undefined, ABI: any): any {
  if (!address || !ABI) return null
  try {
    return getContract(address, ABI)
  } catch (error) {
    console.error('Failed to get contract', error)
    return null
  }
}

export function useTokenContract(tokenAddress?: string): Contract | null {
  return useContract(tokenAddress, ERC20_ABI)
}

export function useMulticallContract(): Contract | null {
  return useContract(getMulticallAddress(), multiCallAbi)
}
