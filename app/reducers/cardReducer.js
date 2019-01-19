import axios from "axios";
const currentIp = "192.168.1.7";

//action types
export const ADD_CARD = "ADD_CARD";
export const GET_ALL_CARDS = "GET_ALL_CARDS";
export const GET_SINGLE_CARD = "GET_SINGLE_CARD";

//action creators
export const addCard = () => ({
  type: ADD_CARD
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
export const fetchAllCards = () => {
  return async dispatch => {
    const { data } = await axios.get(`http://${currentIp}:3000/api/cards`);
    dispatch(getCards(data));
  };
};
export const fetchSingleCard = id => {
  return async dispatch => {
    const { data } = await axios.get(
      `http://${currentIp}:3000/api/cards/${id}`
    );
    dispatch(getSingleCard(data));
  };
};

let initState = {
  cardCount: 0,
  allCards: [],
  currentCard: {}
};

function cardReducer(state = initState, action) {
  let newState = { ...state };
  switch (action.type) {
    case GET_ALL_CARDS:
      newState.allCards = action.payload;
      return newState;
    case ADD_CARD:
      newState.cardCount++;
      return newState;
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
