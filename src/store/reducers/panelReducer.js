import {SET_ACTIVE_PANEL,SET_ACTIVE_PAGE, SET_POPOUT} from '../actions/types'
import {ScreenSpinner} from '@vkontakte/vkui';
import ROUTES from '../../routes'
const initialState = {
    activePage: ROUTES.HOME,
    activePanel: ROUTES.SEND,
    activeModal: null,
    popout: <ScreenSpinner size='large' />
}
export default function(state=initialState,action){
    switch (action.type){
        case SET_ACTIVE_PANEL:
            return {
                ...state,
                activePanel: action.payload
            }
        case SET_ACTIVE_PAGE:
            return {
                ...state,
                activePage: action.payload
            }
        case SET_POPOUT:
            return {
                ...state,
                popout: action.payload
            }
        default:
            return state
    }
}