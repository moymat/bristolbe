import { combineReducers } from "redux";
import coreReducer from "./core";
import bristolReducer from "./bristol";
import userReducer from "./user";

const rootReducer = combineReducers({
	core: coreReducer,
	bristol: bristolReducer,
	user: userReducer,
});

export default rootReducer;
