import React, { useEffect, useState } from "react";
import { cards } from "../utils";
import { removeCardFromPlayer, addCardToCurrentRound } from "../utils/common";

const GameScreen = () => {
  const [players, setPlayers] = useState([
    { name: "Player1", cards: [] },
    { name: "Player2", cards: [] },
    { name: "Player3", cards: [] },
    { name: "Player4", cards: [] },
  ]);
  const [turn, setTurn] = useState("Player1");
  const [currentRound, setCurrentRound] = useState([
    { name: "Player1", card: {} },
    { name: "Player2", card: {} },
    { name: "Player3", card: {} },
    { name: "Player4", card: {} },
  ]);
  const [isCardClickable, setIsCardClickable] = useState(true);
  const [firstEntryCard, setFirstEntryCard] = useState(null);
  const [currentWinner, setCurrentWinner] = useState(null);
  const [teamOne, setTeamOne] = useState({
    mendis: [],
    hands: 0,
  });
  const [teamTwo, setTeamTwo] = useState({
    mendis: [],
    hands: 0,
  });

  useEffect(() => {
    const hands = [[], [], [], []];
    // Deal 13 cards to each player
    for (let i = 0; i < 52; i++) {
      hands[i % 4].push(cards[i]);
    }

    setPlayers(
      players.map((player, index) => ({
        ...player,
        cards: hands[index],
      }))
    );
  }, []);

  const handleTurn = () => {
    const currentPlayerIndex = currentRound.findIndex(
      (player) => player.name === turn
    );
    const nextPlayerIndex = (currentPlayerIndex + 1) % currentRound.length;
    currentPlayerIndex === 0 && setIsCardClickable(false);

    setTimeout(() => {
      setTurn(currentRound[nextPlayerIndex].name);
    }, 1000);
  };

  //For Real Player
  const handleCardClick = (card, cardIndex) => {
    if (turn === "Player1" && isCardClickable) {
      const updatedPlayers = removeCardFromPlayer(cardIndex, players, 0);
      setPlayers(updatedPlayers);

      const updatedRound = addCardToCurrentRound(turn, card, currentRound, 0);
      setCurrentRound(updatedRound);

      handleTurn();
    }
  };

  const selectBotsCardToPlace = (bot) => {
    if (firstEntryCard) {
      const matchedCardsBySuit = bot.cards
        .map((item, index) => ({ item, index }))
        .filter(
          (cardWithIndex) => cardWithIndex.item.suit === firstEntryCard?.suit
        );

      return matchedCardsBySuit;
    } else {
      const mappedCardsByIndex = bot.cards.map((item, index) => ({
        item,
        index,
      }));

      return mappedCardsByIndex;
    }
  };

  //For bot
  const handleBotCardPlacement = (botName) => {
    const botIndex = players.findIndex((player) => player.name === botName);
    const bot = players[botIndex];

    const matchedCardsBySuit = selectBotsCardToPlace(bot);
console.log(matchedCardsBySuit);


    const updatedRound = addCardToCurrentRound(
      botName,
      bot.cards[0],
      currentRound,
      botIndex
    );
    setCurrentRound(updatedRound);

    const updatedPlayers = removeCardFromPlayer(0, players, botIndex);
    setPlayers(updatedPlayers);

    handleTurn();
  };

  const resetTable = () => {
    setCurrentRound([
      { name: "Player1", card: {} },
      { name: "Player2", card: {} },
      { name: "Player3", card: {} },
      { name: "Player4", card: {} },
    ]);
  };

  useEffect(() => {
    const allPlayersHaveCard = currentRound.every(
      (player) => player.card && Object.keys(player.card).length > 0
    );
    if (allPlayersHaveCard) {
      resetTable();
    }

    if (turn !== "Player1") {
      handleBotCardPlacement(turn);
    }
    if (turn === "Player1") {
      setIsCardClickable(true);
    }
  }, [turn]);

  return (
    <div className="h-full">
      {/* Top */}
      <div className="p-2 border-b-[1px] border-slate-500 flex justify-between h-[10vh]">
        <div className="flex justify-center items-center">
          <p className="font-semibold">
            Our hands: <span>5</span>
          </p>
          <div className="ml-4">
            <img className="h-4 " src="Icons/heart.png" alt="" />
          </div>
        </div>
        <p className="flex justify-center items-center text-sm">
          Trump: <span> ?</span>
        </p>
        <div className="flex justify-center items-center">
          <div className="mr-4">
            <img className="h-4 " src="Icons/club.png" alt="card" />
          </div>
          <p className="font-semibold">
            Their hands: <span>1</span>
          </p>
        </div>
      </div>
      <div className="h-[90vh]">
        {/* Middle content */}
        <div className="h-[75%] flex-col p-4 bg-[#17153B]">
          <div className="h-[80%]">
            <div className="flex justify-center gap-2  h-[50%] w-full">
              <div className="h-fit justify-items-center">
                <div className="border-[1px] w-14 h-14 rounded-full bg-red-600 player-circle"></div>
                <p className="bg-gray-800 py-1 px-4 text-xs rounded-2xl transform translate-y-[-8px] player-name">
                  Player 3
                </p>
                {currentRound[2].card?.img && (
                  <img
                    src={`CardsImages/${currentRound[2].card?.img}`}
                    className="single-players-card"
                    alt="card"
                  />
                )}
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex gap-4">
                <div className="h-fit justify-items-center">
                  <div className="border-[1px] w-14 h-14 rounded-full bg-red-600 player-circle"></div>
                  <p className="bg-gray-800 py-1 px-4 text-xs rounded-2xl transform translate-y-[-8px] player-name">
                    Player4
                  </p>
                </div>
                {currentRound[3].card?.img && (
                  <img
                    src={`CardsImages/${currentRound[3].card?.img}`}
                    className="single-players-card"
                    alt="card"
                  />
                )}
              </div>
              <div className="flex gap-4">
                {currentRound[1].card?.img && (
                  <img
                    src={`CardsImages/${currentRound[1].card?.img}`}
                    className="single-players-card"
                    alt="card"
                  />
                )}
                <div className="h-fit flex-col justify-items-center">
                  <div className="border-[1px] w-14 h-14 rounded-full bg-red-600 player-circle"></div>
                  <p className="bg-gray-800 py-1 px-4 text-xs rounded-2xl transform translate-y-[-8px] player-name">
                    Player2
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="justify-items-center w-full h-[20%]">
            {currentRound[0].card?.img && (
              <img
                src={`CardsImages/${currentRound[0].card?.img}`}
                className="single-players-card"
                alt="card"
              />
            )}
          </div>
        </div>
        {/* Cards slider */}
        <div className="border-t-[1px] border-slate-500 h-[25%] overflow-hidden">
          <div className="h-full p-3 flex gap-5 overflow-x-scroll">
            {players[0]?.cards?.map((card, index) => {
              return (
                <img
                  key={card.suit + card.value}
                  src={`CardsImages/${card.img}`}
                  className="h-full cursor-pointer"
                  alt="card"
                  onClick={() => handleCardClick(card, index)}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameScreen;
