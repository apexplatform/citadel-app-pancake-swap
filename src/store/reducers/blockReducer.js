import { types } from "../actions/types"

const initialState = { 
    currentBlock: 0, 
    initialBlock: 0 
}

export default function BlockReducer(state=initialState,action){
    switch (action.type){
        case types.SET_BLOCK: 
            if (state.initialBlock === 0) {
              state.initialBlock = action.payload
            }
            state.currentBlock = action.payload
            return state
        default:
            return state
    }
}