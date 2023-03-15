import { useState } from 'react';
import GameCard from 'components/game/GameCard';
import styled from 'styled-components';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Paper } from '@mui/material';
import { ReactComponent as Question } from 'assets/img/question.svg';

// <Game>
const Game = styled.div`
  .game-board {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    perspective: 1000px;
    margin-bottom: -15px;
    .card {
      width: 14%;
      user-select: none;
      height: 280px;
      padding: 10px;
      box-sizing: border-box;
      text-align: center;
      margin: 16px;
      transition: 0.6s;
      transform-style: preserve-3d;
      position: relative;
      transition: 0.4s;
      &:hover {
        scale: 1.04;
        transition: 0.4s;
      }
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
        color: ${props => props.theme.whiteColor};
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .front {
        transform: rotateY(180deg);
        font-size: 50px;
        line-height: 110px;
        display: flex;
        align-items: center;
        justify-content: center;
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
    }
  }

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
  // 12개
  const cards = [
    'water',
    'coffee',
    'love',
    'like',
    'hate',
    'disturb',
    'node',
    'die',
    'bottle',
    'seal',
    'board',
    'soon',
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
    setFlippedCards(updateFlipped); // 뒤집힌 카드들
    setCardList(updateCards);
  };

  // 다음 버튼을 클릭하면, 지금까지 뒤집은 카드의 정보를 back에 전송(post)하고 다음 페이지로 navigate 한다.

  const handleNext = () => {
    console.log(flippedCards);
  };

  // RETURN

  return (
    <Game>
      <Question
        style={{
          padding: 40,
          margin: '30px 30px 30px 30px',
          position: 'absolute',
          left: '50%',
          top: '7%',
          transform: 'translate(-50%, -50%)',
        }}
      ></Question>
      <Paper
        elevation={3}
        style={{
          padding: 100,
          margin: '75px 30px 30px 30px',
        }}
      >
        <div className="game-board">
          {cardList.map((card, index) => (
            <GameCard
              key={index}
              id={index}
              name={card.name}
              flipped={card.flipped}
              // 최대 12장까지 뒤집을 수 있음
              clicked={flippedCards.length === 12 ? {} : handleClick}
            />
          ))}
        </div>
      </Paper>

      {/* 동그란 화살표 버튼 */}
      <IconButton
        sx={{
          boxShadow: 3,
          width: '3rem',
          height: '3rem',
          bgcolor: theme =>
            theme.palette.mode === 'dark' ? '#101010' : '#fff',
          color: theme =>
            theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
        }}
        style={{
          padding: 20,
          margin: '30px 30px 30px 30px',
          position: 'absolute',
          left: '96.5%',
          top: '51%',
          transform: 'translate(-50%, -50%)',
          border: '1px solid #FFFFFF',
          background: '#FFFFFF',
        }}
        variant="outlined"
        onClick={handleNext}
      >
        <ArrowForwardIosIcon></ArrowForwardIosIcon>
      </IconButton>
    </Game>
  );
};

export default GameBoard;
