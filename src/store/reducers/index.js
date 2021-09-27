import  {combineReducers} from "redux";
import userReducer from './userReducer'
import panelReducer from './panelReducer'
import transactionsReducer from './transactionsReducer'
import walletReducer from './walletReducer'
import errorsReducer from './errorsReducer'
export default combineReducers({
    userReducer,panelReducer,transactionsReducer,walletReducer,errorsReducer
})
