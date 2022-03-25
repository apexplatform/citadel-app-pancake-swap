import { useTokenContract } from './contractHooks'
import {SPENDER} from '../constants/constants'
export const loadTokenAllowance = async(token,walletAddress) =>  {
  const contract = useTokenContract(token?.address)
  const response = await contract?.allowance(walletAddress, SPENDER)
  return parseInt(response?._hex || '0x0', 16)
}