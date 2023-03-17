import puzzle from 'assets/img/puzzle.svg';
import styled from 'styled-components';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';

const Puzzle = styled.div`
  display: flex;
  .puzzle-board {
    background: ${props => props.theme.mainLightColor};
    width: 50%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .start-button {
    background: ${props => props.theme.pointLightColor};
  }

  h1 {
    font-size: 10vw;
    color: white;
  }

  span {
    font-size: 3.5vw;
    color: white;
  }
`;

const ImgBox = styled.div`
  background-image: url(${puzzle});
  background-repeat: no-repeat;
  background-size: cover;
  width: 50%;
`;

const handleStart = () => {
  console.log('시작 버튼을 클릭');
};

// 버튼 바꿔야함
const GamePage = () => {
  return (
    <Puzzle>
      <ImgBox></ImgBox>
      <div className="puzzle-board">
        <h1>Puzzle</h1>
        <span>문장의 빈칸을 채워</span>
        <span>곰돌이 퍼즐을 완성해요!</span>
        <Button
          className="start-button"
          variant="contained"
          size="large"
          onClick={handleStart}
          style={{
            margin: '3%',
            width: '25%',
            height: '10%',
          }}
        >
          <Typography color="white" variant="h3" gutterBottom>
            START
          </Typography>
        </Button>
      </div>
    </Puzzle>
  );
};

export default GamePage;
