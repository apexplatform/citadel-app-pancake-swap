import { types } from "./types";
// import { getWalletConstructor } from "./walletActions";
// import { checkErrors } from "./errorsActions";
// import store from "../store";

const setSelectedPool = (pool) => (dispatch) => {
  dispatch({
    type: types.SET_OPENED_POOL,
    payload: pool,
  });
};

const setIsSuperfluidLock = (pool) => (dispatch) => {
  dispatch({
    type: types.SET_IS_SUPERFLIUD,
    payload: pool,
  });
};

const setSelectedNode = (node) => (dispatch) => {
  dispatch({
    type: types.SET_SELECTED_NODE,
    payload: node,
  });
};

const setSelectedTokens = (tokens) => (dispatch) => {
  dispatch({
    type: types.SET_SELECTED_TOKENS,
    payload: tokens,
  });
};

const setPoolMethod = (pool) => (dispatch) => {
  dispatch({
    type: types.SET_LIQUIDITY_METHOD,
    payload: pool,
  });
};

export const poolActions = {
  setSelectedPool,
  setIsSuperfluidLock,
  setSelectedNode,
  setSelectedTokens,
  setPoolMethod
}