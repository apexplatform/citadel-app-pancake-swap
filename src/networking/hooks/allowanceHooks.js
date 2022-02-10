import { useTokenContract } from './contractHooks'
import {SPENDER} from '../constants/constants'
export const loadTokenAllowance = async(token=null,currentWallet,fromToken) =>  {
  const contract = useTokenContract(token?.address || fromToken?.address)
  const response = await contract?.allowance(currentWallet?.address, SPENDER)
  return parseInt(response?._hex || '0x0', 16)
}