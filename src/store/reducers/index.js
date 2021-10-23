import  {combineReducers} from "redux";
import userReducer from './userReducer'
import panelReducer from './panelReducer'
import transactionsReducer from './transactionsReducer'
import walletReducer from './walletReducer'
import errorsReducer from './errorsReducer'
import swapReducer from './swapReducer'
import blockReducer from './blockReducer'
import multicalReducer from './multicalReducer'
import listReducer from "./listReducer";
export default combineReducers({
    userReducer,panelReducer,listReducer,transactionsReducer,blockReducer,multicalReducer,walletReducer,errorsReducer,swapReducer
})
