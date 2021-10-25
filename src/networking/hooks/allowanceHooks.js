import { useTokenContract } from './contractHooks'
import store from '../../store/store'
import {SPENDER} from '../../config/constants'
import {SET_ALLOWANCE, SET_GAS_PRICE} from '../../store/actions/types'
export const loadTokenAllowance = () => dispatch => {
  const {currentWallet,fromToken} = store.getState().walletReducer
  const contract = useTokenContract(fromToken?.address)
  contract?.allowance(currentWallet.address, SPENDER).then((returnData) => {
    console.log(parseInt(returnData?._hex || '0x0', 16),'------loadTokenAllowance------')
    dispatch({
      type: SET_ALLOWANCE,
      payload: parseInt(returnData?._hex || '0x0', 16)
    })
  })
}

export const loadGasPrice = () => async (dispatch) => {
  const {currentWallet,fromToken} = store.getState().walletReducer
  const contract = useTokenContract(fromToken?.address)
  await contract?.estimate.approve(currentWallet.address, SPENDER).then((returnData) => {
    console.log(parseInt(returnData?._hex || '0x0', 16),'------loadGasPrice------')
    dispatch({
      type: SET_GAS_PRICE,
      payload: parseInt(returnData?._hex || '0x0', 16).toString()
    })
  })
}
