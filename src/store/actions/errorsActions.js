import {GET_ERRORS, GET_NETWORK_ERRORS,GET_ARGUMENTS_ERRORS,GET_VALIDATION_ERRORS,GET_IMPLEMENTATION_ERRORS} from './types'
import {setActiveModal} from './panelActions'
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
        dispatch({
            type: GET_VALIDATION_ERRORS,
            payload: error
        })
    } else if (error instanceof ArgumentsError){
        dispatch({
            type: GET_ARGUMENTS_ERRORS,
            payload: error
        })
    } else if (error instanceof NetworkError){
        let index = error?.message.indexOf('(')
        console.log(index,'--i')
        dispatch({
            type: GET_NETWORK_ERRORS,
            payload: error?.message.substr(0,index)
        })
        dispatch(setActiveModal('errors'))
    } else if (error instanceof ImplementationError){
        dispatch({
            type: GET_IMPLEMENTATION_ERRORS,
            payload: error
        })
    } else {
        dispatch({
            type: GET_ERRORS,
            payload: error
        })
    }
}