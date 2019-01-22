const currentIp = "192.168.1.4";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import cardReducer, {
  fetchAllCards,
  addCard,
  addCardToHand,
  fetchCardToHand,
  fetchSingleCard,
  viewCardsInHand,
  updateCardCount
} from "./cardReducer";
import enemyReducer, {
  fetchAllEnemies,
  fetchSingleEnemy,
  enterBattle,
  exitBattle,
  damageEnemy
} from "./enemyReducer";
import gameReducer, { changePhase } from "./gameReducer";

const reducer = combineReducers({ cardReducer, enemyReducer, gameReducer });
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
  damageEnemy,
  changePhase,
  viewCardsInHand,
  addCardToHand,
  fetchCardToHand,
  updateCardCount
};
