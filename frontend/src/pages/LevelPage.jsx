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
    margin-bottom: 5px;
    .card {
      width: 31%;
      user-select: none;
      height: 220px;
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
        /* 스크롤 */
        /* border: 1px solid black; */
        overflow-y: scroll;
        height: 80%;
        &::-webkit-scrollbar {
          width: 8px;
          cursor: pointer;
        }
        &::-webkit-scrollbar-thumb {
          height: 15%;
          background-color: ${props => props.theme.mainColor};
          border-radius: 20px;
        }
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
        padding: 20px;
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
        padding: 20px;
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

          const wordList = response.data.wordMeanList.map((item, index) => {
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

  const toggleShowSwitch = () => {
    setShowSwitch(prev => !prev);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    console.log(senList, wordList);
    // Sum of Scores of Sentences
    const senSum = senList.reduce((sum1, card) => {
      if (card.flipped === true) {
        return sum1 + card.score;
      } else {
        return sum1;
      }
    }, 0);
    // Sum of Words of Sentences
    const wordSum = wordList.reduce((sum2, card) => {
      if (card.flipped === true) {
        return sum2 + card.score;
      } else {
        return sum2;
      }
    }, 0);
    // total Sum
    const totalSum = senSum + wordSum;
    console.log(totalSum);
    // POST
    try {
      const response = await authApi({
        method: 'POST',
        url: '/member/test/result',
        data: {
          testResult: totalSum,
        },
      });
      console.log(response);
      console.log('POST 완료!');
      navigate('/home');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <StyledLevel change={showSwitch}>
      <Button
        variant="outlined"
        className="submit-button"
        onClick={handleSubmit}
        style={{
          position: 'absolute',
          left: '90.8%',
          top: '3%',
        }}
        sx={{
          width: '5vw',
          height: '8vh',
          padding: 1,
          margin: 2,
          border: '1px solid #ffffff',
        }}
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
          padding: '100px 100px 10px 100px',
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
            width: '4rem',
            height: '4rem',
            bgcolor: theme =>
              theme.palette.mode === 'dark' ? '#101010' : '#fff',
            color: theme =>
              theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
          }}
          style={{
            padding: 20,
            margin: '25px 0px 0px 20px',
            position: 'absolute',
            left: `${showSwitch ? '93%' : '4%'}`,
            top: '53%',
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
