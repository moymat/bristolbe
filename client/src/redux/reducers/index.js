import { combineReducers } from "redux";
import coreReducer from "./core";
import bristolReducer from "./bristol";

const rootReducer = combineReducers({
	core: coreReducer,
	bristol: bristolReducer,
});

export default rootReducer;

//combine reducer
