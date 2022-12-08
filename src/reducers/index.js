import { combineReducers } from "redux";

import authReducer from "./auth/AuthReducer";
import messageReducer from "./auth/MessageReducer"
import adminRestaurantsReducer from "./admin/AdminRestaurantsReducer";
import adminManagersReducer from "./admin/AdminManagersReducer";
import managerChefReducer from "./manager/ManagerChefsReducer";
import managerClerksReducer from "./manager/ManagerClerksReducer";
import managerWaitersReducer from "./manager/ManagerWaitersReducer";

const rootReducer = combineReducers({

  auth: authReducer,
  message: messageReducer,
  adminRestaurants: adminRestaurantsReducer,
  adminManagers: adminManagersReducer,
  managerChefs: managerChefReducer,
  managerClerks: managerClerksReducer,
  managerWaiters: managerWaitersReducer
});

export default rootReducer;
