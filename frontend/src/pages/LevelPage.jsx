import styled from 'styled-components';
import { ReactComponent as Question } from 'assets/img/question.svg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LevelWord from 'components/level/LevelWord';
import LevelSentence from 'components/level/LevelSentence';
import { Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

// style
const StyledLevel = styled.div`
  position: relative;
  .submit-button {
    background-color: #6255a4;
    border-radius: 15px;
    .submit-button-text {
      color: white;
    }
  }
  .toggle-button {
    background-color: #8f84ce;
    border-radius: 15px;
    .toggle-button-inside {
      color: ${props => (props.change ? '#8f84ce' : '#FEAD55')};
    }
  }
  .game-board {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    perspective: 1000px;
    margin-bottom: -15px;
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
  const [flippedCards, setFlippedCards] = useState([]); // 스코어 POST 부모에서 ... 원래는 12개까지만 뒤집을 수 있게 하기 위함
  const [showSwitch, setShowSwitch] = useState(false);

  const toggleShowSwitch = () => {
    setShowSwitch(prev => !prev);
  };

  const handleSubmit = () => {
    console.log(flippedCards);
    navigate('/home');
  };

  return (
    <StyledLevel change={showSwitch}>
      <Button
        className="submit-button"
        onClick={handleSubmit}
        style={{
          position: 'absolute',
          left: '96.5%',
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
        {showSwitch ? <LevelSentence /> : <LevelWord />}
      </div>
    </StyledLevel>
  );
};

export default LevelPage;
