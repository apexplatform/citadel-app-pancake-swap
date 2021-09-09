import {SET_ACTIVE_PANEL,SET_ACTIVE_PAGE} from '../actions/types'
import ROUTES from '../../routes'
const initialState = {
    activePage: ROUTES.HOME,
    activePanel: ROUTES.POOL,
    activeModal: null
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
        default:
            return state
    }
}