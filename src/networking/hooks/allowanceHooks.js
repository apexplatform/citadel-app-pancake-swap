import { useTokenContract } from './contractHooks'
import store from '../../store/store'
import {SPENDER} from '../../config/constants'
import {SET_ALLOWANCE} from '../../store/actions/types'
export const getTokenAllowance = () => dispatch => {
  const {currentWallet,fromToken} = store.getState().walletReducer
  const contract = useTokenContract(fromToken?.address)
  console.log(currentWallet.address, SPENDER,'------currentWallet.address, SPENDER------')
  contract?.allowance(currentWallet.address, SPENDER).then((returnData) => {
    console.log(parseInt(returnData?._hex || '0x0', 16),'------returnData------')
    dispatch({
      type: SET_ALLOWANCE,
      payload: parseInt(returnData?._hex || '0x0', 16)
    })
  })
}

