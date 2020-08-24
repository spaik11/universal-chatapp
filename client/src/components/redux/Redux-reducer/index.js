import { combineReducers } from "redux";
import joinReducer from "./joinReducer";

export default combineReducers({
  join: joinReducer,
});
