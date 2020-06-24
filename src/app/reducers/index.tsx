import { combineReducers } from 'redux';
import authReducer from "./AuthReducer";
import homeReducer from "./HomeReducer";

export default combineReducers({
    auth: authReducer,
    home: homeReducer,
});