import styled from 'styled-components';
import { ReactComponent as Question } from 'assets/img/question.svg';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { authApi } from 'utils/api/customAxios';
import { Paper } from '@mui/material';
import LevelCard from 'components/level/LevelCard';
import LevelCardSen from 'components/level/LevelCardSen';

// style
const StyledLevel = styled.div`
  position: relative;
  .submit-button {
    background-color: #ff8d5b;
    border-radius: 15px;
    .submit-button-text {
      color: white;
    }
  }
  .toggle-button {
    background-color: #6255a4;
    border-radius: 15px;
    .toggle-button-inside {
      color: ${props => (props.change ? '#FEAD55' : '#8f84ce')};
    }
  }
  .game-board {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    perspective: 1000px;
    margin-top: 5px;
    margin-bottom: -20px;
    .card {
      width: 30%;
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
const LevelPage = () => {
  const navigate = useNavigate();
  const [showSwitch, setShowSwitch] = useState(true);
  const [senList, setSenList] = useState([]);
  const [wordList, setWordList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      await authApi
        .get(`member/test/problem`)
        .then(response => {
          const senData = response.data.sentenceMeanList.map((item, index) => {
            return { ...item, flipped: false, id: index };
          });
          setSenList(senData);

          const wordList = response.data.wordMeanList
            .slice(0, 6) // 단어도 6개만 주세요!
            .map((item, index) => {
              return { ...item, flipped: false, id: index };
            });
          setWordList(wordList);
        })
        .catch(error => {
          console.log(error.data);
        });
    }
    fetchData();
  }, []);

  const toggleShowSwitch = () => {
    setShowSwitch(prev => !prev);
  };

  const handleSubmit = () => {
    console.log('Back에 Score보내요');
    console.log(senList, wordList);
    // 여기서 flipped 값이 true인 애들의 score 합쳐서 api로 post 보내고 홈 화면으로 이동시키기
    // navigate('/home');
  };

  const handleClick = index => {
    if (showSwitch) {
      let updateCards = senList.map(card => {
        if (card.id === index) {
          card.flipped = !card.flipped;
        }
        return card;
      });
      setSenList(updateCards);
    } else {
      let updateCards = wordList.map(card => {
        if (card.id === index) {
          card.flipped = !card.flipped;
        }
        return card;
      });
      setWordList(updateCards);
    }
  };

  return (
    <StyledLevel change={showSwitch}>
      <Button
        className="submit-button"
        onClick={handleSubmit}
        style={{
          position: 'absolute',
          left: '91%',
          top: '86%',
        }}
        sx={{ width: '3vw', height: '6vh', padding: 1, margin: 2 }}
      >
        <p className="submit-button-text">제출</p>
      </Button>
      <Question
        style={{
          padding: 50,
          margin: '35px 30px 30px 30px',
          position: 'absolute',
          left: '50%',
          top: '-4%',
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
          {showSwitch
            ? senList.map((card, index) => (
                <LevelCard
                  key={index}
                  id={index}
                  content={card.content}
                  mean={card.mean}
                  score={card.score}
                  flipped={card.flipped}
                  clicked={handleClick}
                />
              ))
            : wordList.map((card, index) => (
                <LevelCardSen
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
      <div>
        <IconButton
          className="toggle-button"
          onClick={toggleShowSwitch}
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
            left: `${showSwitch ? '96%' : '1%'}`,
            top: '48%',
            transform: 'translate(-50%, -50%)',
            border: '1px solid #FFFFFF',
            background: '#FFFFFF',
          }}
          variant="outlined"
        >
          <p className="toggle-button-inside">
            {showSwitch ? <ArrowForwardIosIcon /> : <ArrowBackIosIcon />}
          </p>
        </IconButton>
      </div>
    </StyledLevel>
  );
};

export default LevelPage;
