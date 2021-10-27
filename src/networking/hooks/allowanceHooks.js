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

// export const loadGas = () => async (dispatch) => {
//   const {currentWallet,fromToken} = store.getState().walletReducer
//   const contract = useTokenContract(SPENDER)
//   console.log(contract,'--contract')
//   await contract?.provider.estimateGas({
//     to: '0x10ed43c718714eb63d5aa57b78b54704e256024e', data: '0x38ed173900000000000000000000000000000000000000000000032c80489e2c32b000000000000000000000000000000000000000000000000000000000000b753397cf00000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000a686addf84c135e078c7c917ba20b2d0a737375100000000000000000000000000000000000000000000000000000000611f5af6000000000000000000000000000000000000000000000000000000000000000200000000000000000000000055d398326f99059ff775485246999027b3197955000000000000000000000000e8670901e86818745b28c8b30b17986958fce8cc', value: '0', 
//   }).then((returnData) => {
//     console.log(returnData,'------loadGasP------')
//     // dispatch({
//     //   type: SET_GAS_PRICE,
//     //   payload: parseInt(returnData?._hex || '0x0', 16).toString()
//     // })
//   })
// }
