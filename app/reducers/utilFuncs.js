//utils

export const addToHandFunc = (state, card) => {
  let total = 0;
  state.allCards.map(card => (total += card.quantity));

  state.outOfHandCount = total;
  state.currentCard.quantity -= 1;
  state.outOfHandCount -= 1;
  return state;
};
