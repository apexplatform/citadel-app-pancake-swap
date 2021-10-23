import {createStore,applyMiddleware} from "redux";
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension'
const initialState={};
const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))

const store=createStore(
    rootReducer,
    initialState,
    composedEnhancer
    );
export default store;