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
  .check-button {
    background-color: #6255a4;
    border-radius: 15px;
    .check-button-text {
      color: white;
    }
  }
  .next-button {
    background-color: #6255a4;
    border-radius: 15px;
    .next-button-inside {
      color: ${props => (props.change ? '#ff8d5b' : '#ff8d5b')};
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
    /* width: 30vw; */
    /* height: 30vh; */
    /* top: 30%; */
    /* left: 58%; */
    overflow: auto;
    font-size: 23px;
    display: flex;
    align-items: top; // 맨 윗줄 안 잘리게
    justify-content: center;
    color: white;
  }
`;

const GameDetailPage = () => {
  const navigate = useNavigate();
  const [showSwitch, setShowSwitch] = useState(true);
  const [sentence, setSentence] = useState('');
  const [answer, setAnswer] = useState('');
  const [wordNumber, setWordNumber] = useState('');
  const [tryCount, setTryCount] = useState(1); // 애초에 1로 ( 바로 맞추면 1로 들어가고 틀리면 +1 씩 틀린 횟수 늘어남 대신에 새 문제면 1로 초기화)
  const [problemNumber, setProblemNumber] = useState(1);
  const [correctAnswerCount, setCorrectAnswerCount] = useState(0); // 퍼즐 조각 각각 누적 띄우기 위함
  const [hintList, setHintList] = useState([]); // 쇼츠 모달 보여주기 위함 (watchId 들어옴)
  const [input, setInput] = useState('');

  // 첫 문제
  useEffect(() => {
    async function fetchData() {
      await authApi
        .get(`game/word`)
        .then(response => {
          console.log(response.data);
          const { sentence, answer, wordNo } = response.data;
          setSentence(sentence);
          setAnswer(answer);
          setWordNumber(wordNo);
        })
        .catch(error => {
          console.log(error.data);
        });
    }
    fetchData();
  }, []);

  // 다음 문제
  const handleNext = () => {
    console.log('to the next problem');
    async function fetchData() {
      await authApi
        .get(`game/word`)
        .then(response => {
          console.log(response.data);
          const { sentence, answer, wordNo } = response.data;
          setSentence(sentence);
          setAnswer(answer);
          setWordNumber(wordNo);
        })
        .catch(error => {
          console.log(error.data);
        });
    }
    fetchData();
    setProblemNumber(problemNumber + 1); // 1부터 시작해서 네문제
    // 4번째 문제에서 한번 더 누르면 -> Mission Complete
    if (problemNumber === 4) {
      navigate('/game/complete');
    }
  };

  // Post 보내기!
  async function fetchPost() {
    await authApi({
      method: 'POST',
      url: 'game/word',
      data: {
        wordNo: wordNumber,
        tryCnt: tryCount,
      },
    })
      .then(response => {
        console.log('Posted!');
      })
      .catch(error => {
        console.log(error.data);
      });
  }

  const handleInput = event => {
    const inputValue = event.target.value;
    setInput(inputValue);
  };

  const handleCheck = () => {
    const userAnswer = input.toLowerCase();
    if (userAnswer === answer) {
      alert('Correct');
      console.log('Correct');
      fetchPost(); // 정답 시에, wordNo와 누적 시도 횟수 전송
      setTryCount(1); // 정답이면, 포스트 보낸 후에 이제 tryCount를 1로 초기화해주기 ( 그 다음 문제에 대한 거 저장해야 하니까 not 누적)
      setCorrectAnswerCount(correctAnswerCount + 1);
      setInput(''); // Clear the input box
      if (correctAnswerCount === 0) {
        console.log('한개맞힘');
        handleNext();
        // 첫번째 조각 띄우기
      } else if (correctAnswerCount === 1) {
        console.log('두개맞힘');
        handleNext();
        // 두번째 조각도 띄우기
      } else if (correctAnswerCount === 2) {
        console.log('세개맞힘');
        handleNext();
      } else if (correctAnswerCount === 3) {
        console.log('네개맞힘');
        navigate('/game/complete');
      }
    } else {
      alert('Incorrect');
      console.log('Incorrect');
      setTryCount(prevCount => prevCount + 1); // 시행착오 횟수 올리기
      setInput(''); // Clear the input box
    }
  };

  const handleHint = () => {
    console.log('showHintModal');
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
            margin: 20,
            position: 'relative',
            left: '50%',
            transform: 'translate(0%, 7%)',
            borderRadius: 20,
          }}
        >
          {' '}
          <Paper
            className="problem-paper"
            elevation={3}
            style={{
              width: '35vw',
              height: '40vh',
              paddingTop: 30,
              paddingBottom: 30,
              paddingLeft: 30,
              paddingRight: 30,
              margin: 20,
              borderRadius: 20,
              backgroundColor: '#FEAD55',
              position: 'absolute',
              justifyContent: 'center',
              alignItems: 'center',
              top: '40%' /* vertically center the button */,
              right: '2%' /* position the button to the right */,
              transform:
                'translateY(-50%)' /* adjust vertical position after centering */,
            }}
          >
            <Typography className="problem-text">
              {sentence.replace('tedbear', '_______')}
            </Typography>
          </Paper>
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
              justifyContent: 'center',
              alignItems: 'center',
              top: '80%' /* vertically center the button */,
              right: '9%' /* position the button to the right */,
              transform:
                'translateY(-50%)' /* adjust vertical position after centering */,
            }}
          >
            <div>
              <input
                className="input"
                type="text"
                placeholder="Enter your Answer"
                onChange={handleInput}
              ></input>
              <Button
                className="check-button"
                onClick={handleCheck}
                style={{
                  position: 'absolute',
                  top: '25%' /* vertically center the button */,
                  right: '-20%' /* position the button to the right */,
                  transform:
                    'translateY(-50%)' /* adjust vertical position after centering */,
                }}
                sx={{ width: '3vw', height: '6vh', padding: 1, margin: 2 }}
              >
                <p className="check-button-text">제출</p>
              </Button>
            </div>
          </Paper>
          <Button
            className="hint-button"
            onClick={handleHint}
            style={{
              position: 'absolute',
              top: '8%' /* vertically center the button */,
              right: '3%' /* position the button to the right */,
              transform:
                'translateY(-50%)' /* adjust vertical position after centering */,
            }}
            sx={{ width: '6vw', height: '6vh', padding: 1, margin: 2 }}
          >
            <p className="hint-button-text">힌트</p>
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
              margin: '20px 0px 0px 20px',
              top: '40%' /* vertically center the button */,
              right: '-5%' /* position the button to the right */,
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
        </Paper>
      </div>
    </StyledLevel>
  );
};

export default GameDetailPage;
