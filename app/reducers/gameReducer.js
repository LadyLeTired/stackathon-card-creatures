import axios from "axios";
import { currentIp } from "./index";

//action types
export const CHANGE_PHASE = "CHANGE_PHASE";

export const changePhase = phaseName => ({
  type: CHANGE_PHASE,
  payload: phaseName
});

let initState = {
  turnPhase: ""
};

function gameReducer(state = initState, action) {
  let newState = { ...state };
  switch (action.type) {
    case CHANGE_PHASE:
      newState.turnPhase = action.payload;
      return newState;

    default:
      return state;
  }
}

export default gameReducer;
