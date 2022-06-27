import { types } from '../actions/types'

const initialState = {
    previousPanel: '/'
}
export default function TransactionsReducer(state=initialState,action){
    switch (action.type){
        case types.SET_PREVIOUS_PANEL:
            return {
                ...state,
                previousPanel: action.payload
            }
        default:
            return state
    }
}