import { combineReducers } from 'redux';
import authReducer from "./AuthReducer";
import homeReducer from "./HomeReducer";
import shopReducer from "./ShopsReducer";

export default combineReducers({
    auth: authReducer,
    home: homeReducer,
    shop: shopReducer,
});