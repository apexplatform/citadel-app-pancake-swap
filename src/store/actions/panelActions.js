import { SET_ACTIVE_PANEL, SET_ACTIVE_PAGE } from "./types";

export const setActivePanel = (panel) => dispatch =>{
    dispatch({
        type: SET_ACTIVE_PANEL,
        payload: panel
    })
}

export const setActivePage = (page) => dispatch =>{
    dispatch({
        type: SET_ACTIVE_PAGE,
        payload: page
    })
}
