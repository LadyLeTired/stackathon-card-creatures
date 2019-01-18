import axios from "axios";

//action types
export const ADD_CARD = "ADD_CARD";
export const GET_ALL_CARDS = "GET_ALL_CARDS";

//action creators
export const addCard = () => ({
  type: ADD_CARD
});

export const getCards = cards => ({
  type: GET_ALL_CARDS,
  payload: cards
});

//thunks
export const fetchAllCards = () => {
  return async dispatch => {
    const { data } = await axios.get("http://172.16.25.207:3000/api/cards");
    dispatch(getCards(data));
  };
};

let initState = {
  cardCount: 0,
  allCards: []
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
