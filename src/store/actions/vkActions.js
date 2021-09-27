import bridge from '@vkontakte/vk-bridge';
import { GET_ERRORS} from "./types";
export const initApp = () => dispatch => {
    try{
        console.log(window.location.search.slice(1),'--window.location.search.slice(1)')
        bridge.subscribe(({ detail: { type, data }}) => {
            if (type === 'VKWebAppUpdateConfig') {
                const schemeAttribute = document.createAttribute('scheme');
                schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
                //document.body.attributes.setNamedItem(schemeAttribute);
            }
        });
    }catch(error){
        return dispatch({
            type: GET_ERRORS,
            payload: error
        })
    }
}