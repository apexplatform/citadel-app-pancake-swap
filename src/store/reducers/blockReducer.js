import { SET_BLOCK } from "../actions/types"

const initialState = { currentBlock: 0, initialBlock: 0 }

export default function(state=initialState,action){
    switch (action.type){
        case SET_BLOCK: () => {
            if (state.initialBlock === 0) {
              state.initialBlock = action.payload
            }
                state.currentBlock = action.payload
                return state
            }
        default:
            return state
    }
}