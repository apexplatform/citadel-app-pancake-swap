import { types } from "../actions/types";
  const initialState = {
    poolInfo: null,
    poolId: 1,
    swapPools: null
  };
  export default function SwapReducer (state = initialState, action) {
    switch (action.type) {
      case types.SET_POOL_INFO:
        return {
          ...state,
          poolInfo: action.payload,
        };
      case types.SET_POOLS_LIST:
        return {
          ...state,
          swapPools: action.payload,
        };
      case types.SET_POOL_ID:
        return {
          ...state,
          poolId: action.payload,
        };
      default:
        return state;
    }
  }
  