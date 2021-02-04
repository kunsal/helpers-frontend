import { combineReducers } from "redux";
import userReducer, { userTokenReducer } from "./user-reducer";

const rootReducer = combineReducers({
  user: userReducer,
  token: userTokenReducer
});

export default rootReducer;