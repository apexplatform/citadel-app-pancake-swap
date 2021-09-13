import {SET_ADDRESS, SET_TOKEN,SET_FROM_TOKEN,SET_TO_TOKEN, SET_FROM_AMOUNT, SET_TO_AMOUNT} from '../actions/types'
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

export const setFromToken = (token) => dispatch =>{
    dispatch({
        type: SET_FROM_TOKEN,
        payload: token
    })
}

export const setToToken = (token) => dispatch =>{
    dispatch({
        type: SET_TO_TOKEN,
        payload: token
    })
}

export const setFromAmount= (amount) => dispatch =>{
    dispatch({
        type: SET_FROM_AMOUNT,
        payload: amount
    })
}

export const setToAmount= (amount) => dispatch =>{
    dispatch({
        type: SET_TO_AMOUNT,
        payload: amount
    })
}