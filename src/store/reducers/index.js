import  {combineReducers} from "redux";
import userReducer from './userReducer'
import panelReducer from './panelReducer'
import transactionsReducer from './transactionsReducer'
import addressReducer from './addressReducer'
export default combineReducers({
    userReducer,panelReducer,transactionsReducer,addressReducer
})
