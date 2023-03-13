import { useState } from 'react';
import Card from 'components/game/Card';
import styled from 'styled-components';

// <Game>
const Game = styled.div`
  .game-board {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    perspective: 1000px;
    margin-bottom: -15px;
    .card {
      width: 20%;
      user-select: none;
      height: 112px;
      padding: 10px;
      box-sizing: border-box;
      text-align: center;
      margin: 16px;
      transition: 0.6s;
      transform-style: preserve-3d;
      position: relative;
      div {
        backface-visibility: hidden;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 10px;
        transition: 0.6s;
        background: ${props => props.theme.mainLightColor};
      }
      .back {
        font-size: 50px;
        line-height: 120px;
        cursor: pointer;
        // color: darken(#ee6910, 30%);
        color: ${props => props.theme.whiteColor};
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .front {
        transform: rotateY(180deg);
        line-height: 110px;
        text-emphasis: none;
        img {
          vertical-align: middle;
          width: 70%;
          max-width: 150px;
          max-height: 75%;
        }
      }
      &.flipped {
        transform: rotateY(180deg);
        color: ${props => props.theme.pointLightColor};
      }
      /* &.matched {
        transform: rotateY(180deg);
        .front {
          box-shadow: 0 0 0 2px rgba(#000, 0.05) inset;
          animation: selected 0.8s 0s ease 1;
          animation-fill-mode: both;
          opacity: 0.2;
        }
      } */
    }
  }

  /* .restart-button {
    width: 12em;
    height: 3em;
    cursor: pointer;
    color: rgb(255, 255, 255);
    border-radius: 4px;
    font-size: 12px;
    background-color: #6d1124;
    border: 0;
  } */

  .centered {
    width: 100%;
    height: 100%;
    text-align: center;
  }

  @keyframes selected {
    0% {
      opacity: 0.2;
    }
    30% {
      opacity: 0.5;
    }
    50% {
      opacity: 0.9;
    }
    70% {
      opacity: 0.2;
    }
    100% {
      opacity: 0.3;
    }
  }
`;

// Function

const GameBoard = () => {
  const cards = [
    'TV',
    'TV',
    'VT',
    'VT',
    'hbird',
    'hbird',
    'name',
    'name',
    'seal',
    'seal',
    'tracks',
    'tracks',
  ];

  ///////////// HELPER FUNCTION /////////////

  const shuffle = array => {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  };

  ///////////// SETUP /////////////

  const [cardList, setCardList] = useState(
    shuffle(cards).map((name, index) => {
      return {
        id: index,
        name: name,
        flipped: false,
        // matched: false,
      };
    }),
  );

  const [flippedCards, setFlippedCards] = useState([]);
  // const [gameOver, setGameOver] = useState(false);

  ///////////// GAME LOGIC /////////////

  const handleClick = (name, index) => {
    let currentCard = {
      name,
      index,
    };

    //update card is flipped
    let updateCards = cardList.map(card => {
      if (card.id === index) {
        card.flipped = true;
      }
      return card;
    });
    let updateFlipped = flippedCards;
    updateFlipped.push(currentCard);
    setFlippedCards(updateFlipped);
    setCardList(updateCards);

    //if 2 cards are flipped, check if they are a match
    if (flippedCards.length === 2) {
      setTimeout(() => {
        check();
      }, 750);
    }
  };

  const check = () => {
    let updateCards = cardList;
    if (
      flippedCards[0].name === flippedCards[1].name &&
      flippedCards[0].index !== flippedCards[1].index
    ) {
      // updateCards[flippedCards[0].index].matched = true;
      // updateCards[flippedCards[1].index].matched = true;
      // isGameOver();
    } else {
      updateCards[flippedCards[0].index].flipped = false;
      updateCards[flippedCards[1].index].flipped = false;
    }
    setCardList(updateCards);
    setFlippedCards([]);
  };

  // const isGameOver = () => {
  //   let done = true;
  //   cardList.forEach(card => {
  //     if (!card.matched) done = false;
  //   });
  //   setGameOver(done);
  // };

  ///////////// RESTART - REDO SETUP /////////////

  const restartGame = () => {
    setCardList(
      shuffle(cards).map((name, index) => {
        return {
          id: index,
          name: name,
          flipped: false,
          // matched: false,
        };
      }),
    );

    setFlippedCards([]);
    // setGameOver(false);
  };

  ///////////// DISPLAY /////////////

  return (
    <Game>
      <div className="game-board">
        {cardList.map((card, index) => (
          <Card
            key={index}
            id={index}
            name={card.name}
            flipped={card.flipped}
            // matched={card.matched}
            clicked={flippedCards.length === 2 ? {} : handleClick}
          />
        ))}
        {/* {gameOver && <GameOver restartGame={restartGame} />} */}
      </div>
    </Game>
  );
};

export default GameBoard;
