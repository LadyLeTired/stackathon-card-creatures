import { combineReducers } from "redux";
import * as cardReducer from "./cardReducer";

export default combineReducers(Object.assign(cardReducer));
