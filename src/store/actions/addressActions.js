import {SET_ADDRESS, SET_TOKEN} from '../actions/types'
export const setSelectedAddress = (address) => dispatch =>{
    dispatch({
        type: SET_ADDRESS,
        payload: address
    })
}

export const setSelectedToken = (token) => dispatch =>{
    dispatch({
        type: SET_TOKEN,
        payload: token
    })
}