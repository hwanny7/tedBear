import styled from 'styled-components';
import { ReactComponent as Album } from 'assets/img/album.svg';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { authApi } from 'utils/api/customAxios';
import { Paper } from '@mui/material';

// style
const StyledLevel = styled.div`
  position: relative;
  .hint-button {
    background-color: #ff8d5b;
    border-radius: 15px;
    .hint-button-text {
      color: white;
    }
  }
  .next-button {
    background-color: #6255a4;
    border-radius: 15px;
    .next-button-inside {
      color: ${props => (props.change ? '#FEAD55' : '#8f84ce')};
    }
  }
  .input {
    background-color: transparent; /* set background color to transparent */
    border: none; /* set border to none */
    outline: none; /* set outline to none */
    opacity: 100%;
    position: absolute;
    justify-content: center;
    height: 5vh;
    width: 26vw;
    top: 20%;
    color: white;
    font-size: 20px;
  }
  .input::placeholder {
    color: white;
    font-size: 20px;
    text-align: center;
  }
  .problem-text {
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
      background-color: ${props => props.theme.pointColor};
      border-radius: 20px;
    }
    position: absolute;
    width: 30vw;
    height: 30vh;
    top: 30%;
    left: 58%;
    overflow: auto;
    font-size: 23px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }
`;

const GameDetailPage = () => {
  const navigate = useNavigate();
  const [showSwitch, setShowSwitch] = useState(true);
  const [Problem, setProblem] = useState([]);

  useEffect(() => {
    async function fetchData() {
      await authApi
        .get(`member/test/problem`)
        .then(response => {
          const Data = response.data.map((item, index) => {
            return { ...item, id: index };
          });
          setProblem(Data);
        })
        .catch(error => {
          console.log(error.data);
        });
    }
    fetchData();
  }, []);

  const handleNext = () => {
    console.log('다음 문제로');
  };

  const handleHint = () => {
    console.log('힌트 모달 띄우기');
  };

  return (
    <StyledLevel change={showSwitch}>
      <div>
        <Album
          style={{
            height: '90vh',
            width: '50vw',
            padding: 30,
            margin: '10px 10px 10px 10px',
            position: 'absolute',
            alignItems: 'left',
            justifyContent: 'felx-start',
            transform: 'translate(0%, 0%)',
          }}
        ></Album>
      </div>
      <div>
        <Paper
          elevation={3}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: '40vw',
            height: '80vh',
            padding: 100,
            margin: 30,
            position: 'relative',
            left: '50%',
            transform: 'translate(0%, 7%)',
            borderRadius: 20,
          }}
        ></Paper>
        <Paper
          className="problem-paper"
          elevation={3}
          style={{
            width: '35vw',
            height: '40vh',
            padding: 100,
            margin: 30,
            borderRadius: 20,
            backgroundColor: '#FEAD55',
            position: 'absolute',
            top: '43%' /* vertically center the button */,
            right: '6.5%' /* position the button to the right */,
            transform:
              'translateY(-50%)' /* adjust vertical position after centering */,
          }}
        ></Paper>
        <Typography className="problem-text">
          Need to show the problems using map function and axios get method!
          There will be a blank in a sentencce. ex. _____ like you!
        </Typography>
        <Paper
          elevation={3}
          style={{
            width: '30vw',
            height: '1vh',
            padding: 30,
            margin: 30,
            borderRadius: 20,
            backgroundColor: '#8F84CE',
            position: 'absolute',
            top: '80%' /* vertically center the button */,
            right: '9%' /* position the button to the right */,
            transform:
              'translateY(-50%)' /* adjust vertical position after centering */,
          }}
        >
          <input className="input" placeholder="Enter your Answer"></input>
        </Paper>
        <Button
          className="hint-button"
          onClick={handleHint}
          style={{
            position: 'absolute',
            top: '11%' /* vertically center the button */,
            right: '6%' /* position the button to the right */,
            transform:
              'translateY(-50%)' /* adjust vertical position after centering */,
          }}
          sx={{ width: '3vw', height: '6vh', padding: 1, margin: 2 }}
        >
          <p className="hint-button-text">Hint!</p>
        </Button>
        <IconButton
          className="next-button"
          onClick={handleNext}
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
            position: 'absolute',
            margin: '25px 0px 0px 20px',
            top: '45%' /* vertically center the button */,
            right: '4%' /* position the button to the right */,
            transform:
              'translateY(-50%)' /* adjust vertical position after centering */,
            border: '1px solid #FFFFFF',
            background: '#FFFFFF',
          }}
          variant="outlined"
        >
          <p className="next-button-inside">
            <ArrowForwardIosIcon />
          </p>
        </IconButton>
      </div>
    </StyledLevel>
  );
};

export default GameDetailPage;
