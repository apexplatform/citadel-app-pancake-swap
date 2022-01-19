import { useTokenContract } from './contractHooks'
import store from '../../store/store'
import {SPENDER} from '../constants/constants'
export const loadTokenAllowance = async(token=null) =>  {
  const {currentWallet,fromToken} = store.getState().walletReducer
  const contract = useTokenContract(token?.address || fromToken?.address)
  const response = await contract?.allowance(currentWallet?.address, SPENDER)
  return parseInt(response?._hex || '0x0', 16)
}