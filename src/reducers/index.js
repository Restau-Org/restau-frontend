import { combineReducers } from "redux";

import authReducer from "./AuthReducer";
import messageReducer from "./MessageReducer"
import adminRestaurantsReducer from "./AdminRestaurantsReducer";
import adminManagersReducer from "./AdminManagersReducer";

const rootReducer = combineReducers({

  auth: authReducer,
  message: messageReducer,
  adminRestaurants: adminRestaurantsReducer,
  adminManagers: adminManagersReducer
});

export default rootReducer;
