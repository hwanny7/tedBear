import styled from 'styled-components';
import { ReactComponent as Album } from 'assets/img/album.svg';
import { ReactComponent as AlbumA } from 'assets/img/albuma.svg';
import { ReactComponent as AlbumB } from 'assets/img/albumb.svg';
import { ReactComponent as AlbumC } from 'assets/img/albumc.svg';
import { ReactComponent as AlbumD } from 'assets/img/albumd.svg';
import Paw1 from 'assets/img/paw1.svg';
import Paw2 from 'assets/img/paw2.svg';
import Paw3 from 'assets/img/paw3.svg';
import Paw4 from 'assets/img/paw4.svg';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { authApi } from 'utils/api/customAxios';
import { Paper } from '@mui/material';
import { handleSuccessState, handleErrorState } from 'redux/snack';
import { useDispatch } from 'react-redux';
import SnackBar from 'components/common/SnackBar';

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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showSwitch, setShowSwitch] = useState(true);
  const [sentence, setSentence] = useState('');
  const [answer, setAnswer] = useState('');
  const [wordNumber, setWordNumber] = useState('');
  const [tryCount, setTryCount] = useState(1); // 애초에 1로 ( 바로 맞추면 1로 들어가고 틀리면 +1 씩 틀린 횟수 늘어남 대신에 새 문제면 1로 초기화)
  const [correctAnswerCount, setCorrectAnswerCount] = useState(1); // 퍼즐 조각 각각 누적 띄우기 위함
  const [hintList, setHintList] = useState([]); // 쇼츠 모달 보여주기 위함 (watchId 들어옴)
  const [input, setInput] = useState('');
  const [selectedAlbum, setSelectedAlbum] = useState(1);
  const [showPaw1, setShowPaw1] = useState(false);
  const [showPaw2, setShowPaw2] = useState(false);
  const [showPaw3, setShowPaw3] = useState(false);
  const [showPaw4, setShowPaw4] = useState(false);
  const [showPaw5, setShowPaw5] = useState(false);
  const [showPaw6, setShowPaw6] = useState(false);
  const [showPaw7, setShowPaw7] = useState(false);
  const [showPaw8, setShowPaw8] = useState(false);
  const [retry, setRetry] = useState(false);

  const handleRetry = () => {
    setCorrectAnswerCount(1); // 맞은 개수 누적 초기화
    setSelectedAlbum(1); // 앨범 퍼즐 초기화
    setShowPaw1(false);
    setShowPaw2(false);
    setShowPaw3(false);
    setShowPaw4(false);
    setShowPaw5(false);
    setShowPaw6(false);
    setShowPaw7(false);
    setShowPaw8(false);
    setRetry(false);
    handleNext(); // 문제 변경 필요
  };

  // 첫 문제
  useEffect(() => {
    async function fetchData() {
      await authApi
        .get(`game/word`)
        .then(response => {
          console.log(`누적정답횟수${correctAnswerCount}`);
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
          console.log(`누적정답횟수${correctAnswerCount}`);
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
        console.log(response.data);
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
      fetchPost(); // 정답 시에, wordNo와 누적 시도 횟수 전송
      setTryCount(1); // 정답이면, 포스트 보낸 후에 이제 tryCount를 1로 초기화해주기 ( 그 다음 문제에 대한 거 저장해야 하니까 not 누적)
      setCorrectAnswerCount(correctAnswerCount + 1);
      console.log(`맞은개수${correctAnswerCount}`);
      setInput(''); // Clear the input box
      alert('Correct');
      // dispatch(
      //   handleSuccessState({
      //     open: true,
      //     message: '정답입니다!',
      //     severity: 'success',
      //   }),
      //   console.log('Dispatch'),
      // );

      if (correctAnswerCount === 1) {
        console.log('한개맞힘');
        handleNext();
        // 첫번째 조각 띄우기
        setSelectedAlbum(2);
      } else if (correctAnswerCount === 2) {
        console.log('두개맞힘');
        handleNext();
        // 두번째 조각도 띄우기
        setSelectedAlbum(3);
      } else if (correctAnswerCount === 3) {
        console.log('세개맞힘');
        handleNext();
        setSelectedAlbum(4);
      } else if (correctAnswerCount === 4) {
        console.log('네개맞힘');
        setSelectedAlbum(5);
        // 전부 다 맞힐 때에 미션 완료! handleNext와 무관!
        // navigate('/game/complete');
      }
    } else {
      alert('Incorrect');
      // dispatch(
      //   handleErrorState({
      //     open: true,
      //     message: 'An error occurred!',
      //     // severity: 'warning', // set the 'severity' value to 'warning'
      //   }),
      //   console.log('Dispatch'),
      // );
      console.log('Incorrect');
      setTryCount(prevCount => prevCount + 1); // 시행착오 횟수 올리기
      setInput(''); // Clear the input box
    }
  };

  // 발바닥 애니메이션
  useEffect(() => {
    console.log('발바닥 useEffect');
    console.log(correctAnswerCount);
    if (correctAnswerCount === 5) {
      console.log('발바닥 True');
      setTimeout(() => {
        setShowPaw1(true);
      }, 250);
      setTimeout(() => {
        setShowPaw2(true);
      }, 500);
      setTimeout(() => {
        setShowPaw3(true);
      }, 750);
      setTimeout(() => {
        setShowPaw4(true);
      }, 1000);
      setTimeout(() => {
        setShowPaw5(true);
      }, 1250);
      setTimeout(() => {
        setShowPaw6(true);
      }, 1500);
      setTimeout(() => {
        setShowPaw7(true);
      }, 1750);
      setTimeout(() => {
        setShowPaw8(true);
      }, 2000);
      setTimeout(() => {
        setRetry(true);
      }, 2250);
    }
  }, [correctAnswerCount]);

  const handleHint = () => {
    console.log('showHintModal');
  };

  return (
    <StyledLevel change={showSwitch}>
      <div>
        {selectedAlbum === 1 && (
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
        )}
        {selectedAlbum === 2 && (
          <AlbumA
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
          ></AlbumA>
        )}
        {selectedAlbum === 3 && (
          <AlbumB
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
          ></AlbumB>
        )}
        {selectedAlbum === 4 && (
          <AlbumC
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
          ></AlbumC>
        )}
        {selectedAlbum === 5 && (
          <AlbumD
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
          ></AlbumD>
        )}
      </div>
      <div>
        {showPaw1 && (
          <img
            src={Paw1}
            alt=""
            style={{
              left: '50%',
              opacity: 1,
              position: 'absolute',
              zIndex: 9999, // set a high z-index to ensure it appears on top of other elements
            }}
          />
        )}
      </div>
      <div>
        {showPaw2 && (
          <img
            src={Paw2}
            alt=""
            style={{
              left: '20%',
              top: '50%',
              opacity: 1,
              position: 'absolute',
              zIndex: 9999, // set a high z-index to ensure it appears on top of other elements
            }}
          />
        )}
      </div>
      <div>
        {showPaw3 && (
          <img
            src={Paw3}
            alt=""
            style={{
              left: '80%',
              top: '50%',
              opacity: 1,
              position: 'absolute',
              zIndex: 9999, // set a high z-index to ensure it appears on top of other elements
            }}
          />
        )}
      </div>
      <div>
        {showPaw4 && (
          <img
            src={Paw4}
            alt=""
            style={{
              left: '50%',
              top: '80%',
              opacity: 1,
              position: 'absolute',
              zIndex: 9999, // set a high z-index to ensure it appears on top of other elements
            }}
          />
        )}
      </div>
      <div>
        {showPaw5 && (
          <img
            src={Paw1}
            alt=""
            style={{
              left: '10%',
              opacity: 1,
              position: 'absolute',
              zIndex: 9999, // set a high z-index to ensure it appears on top of other elements
            }}
          />
        )}
      </div>
      <div>
        {showPaw6 && (
          <img
            src={Paw2}
            alt=""
            style={{
              left: '90%',
              opacity: 1,
              position: 'absolute',
              zIndex: 9999, // set a high z-index to ensure it appears on top of other elements
            }}
          />
        )}
      </div>
      <div>
        {showPaw7 && (
          <img
            src={Paw3}
            alt=""
            style={{
              left: '10%',
              top: '90%',
              opacity: 1,
              position: 'absolute',
              zIndex: 9999, // set a high z-index to ensure it appears on top of other elements
            }}
          />
        )}
      </div>
      <div>
        {showPaw8 && (
          <img
            src={Paw4}
            alt=""
            style={{
              left: '90%',
              top: '90%',
              opacity: 1,
              position: 'absolute',
              zIndex: 9999, // set a high z-index to ensure it appears on top of other elements
            }}
          />
        )}
      </div>
      <div>
        {retry && (
          <IconButton
            onClick={handleRetry}
            style={{
              boxShadow: 3,
              width: '20rem',
              height: '20rem',
              left: '38%',
              top: '30%',
              opacity: 1,
              position: 'absolute',
              zIndex: 9999, // set a high z-index to ensure it appears on top of other elements
            }}
          >
            <RefreshIcon
              style={{ width: '20rem', height: '20rem', left: '50%' }}
            ></RefreshIcon>
          </IconButton>
        )}
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
