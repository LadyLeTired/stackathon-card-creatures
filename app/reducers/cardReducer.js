import createReducer from "../lib/createReducer";
import * as types from "../actions/types";

export const cardReducer = createReducer(0, {
  [types.ADD_CARD](state, action) {
    return state + 1;
  }
});
