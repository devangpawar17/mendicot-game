  const checkAndResetRound = () => {
    const allCardsFilled = currentRound.every(
      (player) => Object.keys(player.card).length > 0
    );

    if (allCardsFilled) {
      setCurrentRound([
        { name: "Player1", card: {} },
        { name: "Player2", card: {} },
        { name: "Player3", card: {} },
        { name: "Player4", card: {} },
      ]);
    }
    else return false
  };