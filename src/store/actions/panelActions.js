import { SET_ACTIVE_PANEL, SET_ACTIVE_PAGE, SET_POPOUT } from "./types";

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

export const setPopout = (item) => dispatch =>{
    dispatch({
        type: SET_POPOUT,
        payload: item
    })
}