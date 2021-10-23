import {getWalletConstructor} from './walletActions'
import {checkErrors} from './errorsActions'
export const prepareClaimRewards  = () => dispatch => {
    try{
        const wallet = getWalletConstructor()
        let response = wallet.prepareClaimRewards()
        dispatch(checkErrors(response))
    }catch(err){
        dispatch(checkErrors(err))
    }
}