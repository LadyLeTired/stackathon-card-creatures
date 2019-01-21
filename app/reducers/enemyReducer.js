import axios from "axios";
import { currentIp } from "./index";

//action types
// export const ADD_CARD = "ADD_CARD";
export const GET_ALL_ENEMIES = "GET_ALL_ENEMIES";
export const GET_SINGLE_ENEMY = "GET_SINGLE_ENEMY";
export const ENTER_BATTLE = "ENTER_BATTLE";
export const EXIT_BATTLE = "EXIT_BATTLE";

export const DAMAGE_ENEMY = "DAMAGE_ENEMY";

export const getEnemies = enemies => ({
  type: GET_ALL_ENEMIES,
  payload: enemies
});
export const getSingleEnemy = enemy => ({
  type: GET_SINGLE_ENEMY,
  payload: enemy
});
export const enterBattle = () => ({
  type: ENTER_BATTLE
});
export const exitBattle = () => ({
  type: EXIT_BATTLE
});
export const damageEnemy = dmg => ({
  type: DAMAGE_ENEMY,
  payload: dmg
});

//thunks
export const fetchAllEnemies = () => {
  try {
    return async dispatch => {
      const { data } = await axios.get(
        `http://${currentIp}:3000/api/enemies/?isDefeated=alive`
      );
      dispatch(getEnemies(data));
    };
  } catch (err) {
    console.error(err);
  }
};
export const fetchSingleEnemy = id => {
  try {
    return async dispatch => {
      const { data } = await axios.get(
        `http://${currentIp}:3000/api/enemies/${id}`
      );
      dispatch(getSingleEnemy(data));
    };
  } catch (err) {
    console.error(err);
  }
};

//utils
const damageCurrentEnemy = (enemy, dmg) => {
  enemy.hp -= dmg;
  if (enemy.hp <= 0) {
    enemy.isDefeated = true;
    enemy.hp = 0;
  }
  return enemy;
};

let initState = {
  allEnemies: [],
  currentEnemy: {},
  inBattle: false
};

function enemyReducer(state = initState, action) {
  let newState = { ...state };
  switch (action.type) {
    case GET_ALL_ENEMIES:
      newState.allEnemies = action.payload;
      return newState;
    case GET_SINGLE_ENEMY:
      return { ...state, currentEnemy: action.payload };
    case ENTER_BATTLE:
      return { ...state, inBattle: true };
    case EXIT_BATTLE:
      return { ...state, inBattle: false };
    case DAMAGE_ENEMY:
      newState.currentEnemy = damageCurrentEnemy(
        newState.currentEnemy,
        action.payload
      );
      return newState;
    default:
      return state;
  }
}

export default enemyReducer;

// const experienceReducer = (state = initState, action) => {
//   switch (action.type) {
//     case GET_EXPERIENCE:
//       return {...state, singleExperience: action.payload}
//     case GET_ALL_EXPERIENCES:
//       return {...state, allExperiences: action.payload}
//     case GET_FILTERED_EXPERIENCES:
//       return {...state, filteredExperiences: action.payload}
//     case POST_REVIEWS:
//       return state
//     default:
//       return state
//   }
// }
