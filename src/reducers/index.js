import { combineReducers } from "redux";

import authReducer from "./AuthReducer";
import messageReducer from "./MessageReducer"
import adminRestaurantsReducer from "./AdminRestaurantsReducer";

const rootReducer = combineReducers({

  auth: authReducer,
  message: messageReducer,
  adminRestaurants: adminRestaurantsReducer
});

export default rootReducer;
