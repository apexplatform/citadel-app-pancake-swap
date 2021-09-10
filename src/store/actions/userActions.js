import { SET_CURRENT_USER, GET_ERRORS} from "./types";
import bridge from '@vkontakte/vk-bridge';

export const setUser = (setPopout) => dispatch =>{
    try{
        const user = bridge.send('VKWebAppGetUserInfo');
        setPopout(null)
        return dispatch({
            type: SET_CURRENT_USER,
            payload: user
        })
    }catch(error){
        return dispatch({
            type: GET_ERRORS,
            payload: error
        })
    }
}