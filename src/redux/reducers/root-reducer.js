import { combineReducers } from "redux";
import userReducer, { userTokenReducer } from "./user-reducer";

const rootReducer = combineReducers({
  user: userReducer,
  userToken: userTokenReducer
});

export default rootReducer;