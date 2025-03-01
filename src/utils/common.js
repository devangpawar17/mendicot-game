export const removeCardFromPlayer = (
  cardIndex,
  currentState,
  playerIndex
) => {
  const updatedPlayers = [...currentState];
  const updatedPlayer = { ...updatedPlayers[playerIndex] };
  updatedPlayer.cards.splice(cardIndex, 1);
  updatedPlayers[playerIndex] = updatedPlayer;

  return updatedPlayers;
};

export const addCardToCurrentRound = (
  playerName,
  card,
  currentState,
  playerIndex
) => {
  console.log( playerName,
    card,
    currentState,
    playerIndex);
  
  const updatedRound = [...currentState];
  updatedRound[playerIndex] = { name: playerName, card };
  return updatedRound;
};
