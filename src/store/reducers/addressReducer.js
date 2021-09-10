import {SET_ADDRESS,SET_TOKEN} from '../actions/types'
import { addresses,tokens } from '../../data'
const initialState = {
    selectedAddress: addresses[0],
    selectedToken: tokens[0]
}
export default function(state=initialState,action){
    switch (action.type){
        case SET_ADDRESS:
            return {
                ...state,
                selectedAddress: action.payload
            }
        case SET_TOKEN:
            return {
                ...state,
                selectedToken: action.payload
            }
        default:
            return state
    }
}