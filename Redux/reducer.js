import {combineReducers} from "redux";
import tokenReducer from './tokenReducer';
import allVendorsReducer from "./getAllVendorReducer";
import userReducer from "./userReducer";

const reducer = combineReducers({
    login: tokenReducer,
    vendor: allVendorsReducer,
    user : userReducer
});

export default reducer;