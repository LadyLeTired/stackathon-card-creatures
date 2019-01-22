import axios from "axios";
import { currentIp } from "./index";
import { addToHandFunc } from "./utilFuncs";

//action types
export const ADD_CARD_TO_HAND = "ADD_CARD_TO_HAND";
export const GET_HAND = GET_HAND;
export const GET_ALL_CARDS = "GET_ALL_CARDS";
export const GET_SINGLE_CARD = "GET_SINGLE_CARD";

//action creators
export const addCardToHand = card => ({
  type: ADD_CARD_TO_HAND,
  payload: card
});
export const viewCardsInHand = cards => ({
  type: GET_HAND,
  payload: cards
});

export const getCards = cards => ({
  type: GET_ALL_CARDS,
  payload: cards
});
export const getSingleCard = card => ({
  type: GET_SINGLE_CARD,
  payload: card
});

//thunks
export const drawCard = () => {
  try {
    return async dispatch => {
      const { data } = await axios.get(`http://${currentIp}:3000/api/cards`);
      const randomNum = Math.floor(Math.random() * data.length + 1);
      dispatch(addCardToHand(data[randomNum]));
    };
  } catch (err) {
    console.error(err);
  }
};

export const fetchAllCards = () => {
  try {
    return async dispatch => {
      const { data } = await axios.get(`http://${currentIp}:3000/api/cards`);
      dispatch(getCards(data));
    };
  } catch (err) {
    console.error(err);
  }
};

export const updateCardCount = card => {
  try {
    return async dispatch => {
      const { data } = await axios.put(
        `http://${currentIp}:3000/api/cards/${card.id}`
      );

      dispatch(addCardToHand(card));
    };
  } catch (err) {
    console.error(err);
  }
};
export const fetchSingleCard = id => {
  try {
    return async dispatch => {
      const { data } = await axios.get(
        `http://${currentIp}:3000/api/cards/${id}`
      );
      dispatch(getSingleCard(data));
    };
  } catch (err) {
    console.error(err);
  }
};

let initState = {
  cardCount: 0,
  allCards: [],
  outOfHandCount: 0,
  currentCard: {},
  playerHand: []
};

function cardReducer(state = initState, action) {
  let newState = { ...state };
  switch (action.type) {
    case ADD_CARD_TO_HAND:
      newState.playerHand = [...state.playerHand, action.payload];
      return addToHandFunc(newState, action.payload);
    case GET_HAND:
      return action.payload;
    case GET_ALL_CARDS:
      newState.allCards = action.payload;
      return newState;
    // case ADD_CARD:
    //   newState.cardCount++;
    //   return newState;
    case GET_SINGLE_CARD:
      // newState.currentCard = action.payload;
      // return newState;
      return { ...state, currentCard: action.payload };
    default:
      return state;
  }
}

export default cardReducer;

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
