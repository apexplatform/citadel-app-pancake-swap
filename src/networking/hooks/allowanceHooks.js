import { useTokenContract } from './contractHooks'
import store from '../../store/store'
import {SPENDER} from '../constants/constants'
import {SET_ALLOWANCE} from '../../store/actions/types'
export const loadTokenAllowance = () => dispatch => {
  const {currentWallet,fromToken} = store.getState().walletReducer
  const contract = useTokenContract(fromToken?.address)

  contract?.allowance(currentWallet?.address, SPENDER).then((returnData) => {
    dispatch({
      type: SET_ALLOWANCE,
      payload: parseInt(returnData?._hex || '0x0', 16)
    })
    console.log(fromToken,'----allowance--',parseInt(returnData?._hex || '0x0', 16))
  })
}