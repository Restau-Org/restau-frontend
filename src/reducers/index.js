import { combineReducers } from "redux";

import authReducer from "./AuthReducer";
import messageReducer from "./MessageReducer"

const rootReducer = combineReducers({

  auth: authReducer,
  message: messageReducer
});

export default rootReducer;
