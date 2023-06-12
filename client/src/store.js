import { applyMiddleware, combineReducers, createStore } from "redux";
import {
  addBurgersReducer,
  editBurgerReducer,
  getAllBurgersReducer,
  getBurgerByIdReducer,
} from "./reducers/burgerReducers";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { cartReducer } from "./reducers/cartReducers";
import {
  getAllUsersReducer,
  loginUserReducer,
  registerUserReducer,
} from "./reducers/userReducers";
import {
  checkoutOrderReducer,
  getAllOrdersReducer,
  getUsersOrdersReducer,
} from "./reducers/orderReducers";

const finalReducer = combineReducers({
  getAllBurgersReducer: getAllBurgersReducer,
  cartReducer: cartReducer,
  registerUserReducer: registerUserReducer,
  loginUserReducer: loginUserReducer,
  checkoutOrderReducer: checkoutOrderReducer,
  getUsersOrdersReducer: getUsersOrdersReducer,
  getAllUsersReducer: getAllUsersReducer,
  getAllOrdersReducer: getAllOrdersReducer,
  addBurgersReducer: addBurgersReducer,
  editBurgerReducer: editBurgerReducer,
  getBurgerByIdReducer: getBurgerByIdReducer,
});

const cartItems = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const currentUser = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser"))
  : null;

const initialState = {
  cartReducer: {
    cartItems: cartItems,
  },
  loginUserReducer: {
    currentUser: currentUser,
  },
};

const compose = composeWithDevTools({});

const store = createStore(
  finalReducer,
  initialState,
  compose(applyMiddleware(thunk))
);

export default store;
