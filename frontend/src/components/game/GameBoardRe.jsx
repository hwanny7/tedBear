import GameCard from 'components/game/GameCard';
import styled from 'styled-components';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Paper } from '@mui/material';
import { ReactComponent as Question } from 'assets/img/question.svg';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from 'utils/api/customAxios';

// style
const Game = styled.div`
  .game-board {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    perspective: 1000px;
    margin-bottom: -15px;
    .card {
      width: 15%;
      user-select: none;
      height: 200px;
      padding: 5px;
      box-sizing: border-box;
      text-align: center;
      margin: 9px;
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
        overflow: auto;
        font-size: 20px;
        /* line-height: 120px; */
        cursor: pointer;
        color: ${props => props.theme.whiteColor};
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .front {
        overflow: auto;
        transform: rotateY(180deg);
        font-size: 20px;
        /* line-height: 120px; */
        display: flex;
        cursor: pointer;
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
const GameBoardRe = () => {
  const navigate = useNavigate();
  const [Loaded, setLoaded] = useState(false);
  const [flippedCards, setFlippedCards] = useState([]); // 뒤집힌 카드의 리스트 -> score 합산 -> 버튼 click시, post
  const [cardList, setCardList] = useState([]);

  useEffect(() => {
    console.log('hi');
    async function fetchData() {
      await authApi
        .get(`member/test/problem`)
        .then(response => {
          const data = response.data.sentenceMeanList.map((item, index) => {
            return { ...item, flipped: false, id: index };
          });
          console.log(data);
          setCardList(data);
        })
        .catch(error => {
          console.log(error.data);
        });
    }
    setLoaded(true);
    fetchData();
  }, []);

  const handleClick = index => {
    let updateCards = cardList.map(card => {
      if (card.id === index) {
        card.flipped = !card.flipped;
      }
      return card;
    });

    setCardList(updateCards);
  };

  const handleNext = () => {
    console.log(flippedCards);
    navigate('/home');
  };

  return (
    <Game>
      <Question
        style={{
          padding: 50,
          margin: '35px 30px 30px 30px',
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
              content={card.content}
              mean={card.mean}
              score={card.score}
              flipped={card.flipped}
              clicked={handleClick}
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
          margin: '25px 0px 0px 20px',
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

export default GameBoardRe;
