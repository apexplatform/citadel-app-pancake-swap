import {GET_ERRORS, GET_NETWORK_ERRORS,GET_ARGUMENTS_ERRORS,GET_VALIDATION_ERRORS,GET_IMPLEMENTATION_ERRORS} from './types'
import {ValidationError,NetworkError,ImplementationError,ArgumentsError} from '../../networking/models/Errors'
export const clearErrors = () => dispatch =>{
    dispatch({
        type: GET_ERRORS,
        payload: null
    })
    dispatch({
        type: GET_NETWORK_ERRORS,
        payload: null
    })
}


export const checkErrors = (error) => dispatch => {
    if (error instanceof ValidationError) {
        return dispatch({
            type: GET_VALIDATION_ERRORS,
            payload: error
        })
    } else if (error instanceof ArgumentsError){
        return dispatch({
            type: GET_ARGUMENTS_ERRORS,
            payload: error
        })
    } else if (error instanceof NetworkError){
        return dispatch({
            type: GET_NETWORK_ERRORS,
            payload: error
        })
    } else if (error instanceof ImplementationError){
        return dispatch({
            type: GET_IMPLEMENTATION_ERRORS,
            payload: error
        })
    } else {
        return dispatch({
            type: GET_ERRORS,
            payload: error
        })
    }
}