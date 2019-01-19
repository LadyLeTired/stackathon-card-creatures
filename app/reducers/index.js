import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import cardReducer, {
  fetchAllCards,
  addCard,
  fetchSingleCard
} from "./cardReducer";

const reducer = combineReducers({ cardReducer });
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
// exported thunk creators
export { fetchAllCards, addCard, fetchSingleCard };
