const currentIp = "192.168.1.7";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import cardReducer, {
  fetchAllCards,
  addCard,
  fetchSingleCard
} from "./cardReducer";
import enemyReducer, {
  fetchAllEnemies,
  fetchSingleEnemy,
  enterBattle,
  exitBattle,
  damageEnemy
} from "./enemyReducer";

const reducer = combineReducers({ cardReducer, enemyReducer });
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
// exported thunk creators
export {
  fetchAllCards,
  addCard,
  fetchSingleCard,
  fetchAllEnemies,
  fetchSingleEnemy,
  currentIp,
  enterBattle,
  exitBattle,
  damageEnemy
};
