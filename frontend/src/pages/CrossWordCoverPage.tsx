import crossword from 'assets/img/crossword.svg';
import styled from 'styled-components';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

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
    margin-bottom: 20px;
    font-size: 8.5vw;
    color: white;
  }

  span {
    margin-top: 10px;
    margin-bottom: 20px;
    font-size: 3vw;
    color: white;
  }
`;

const ImgBox = styled.div`
  background-image: url(${crossword});
  background-repeat: no-repeat;
  background-size: cover;
  width: 50%;
`;

const CrossWordCoverPage = () => {
  const navigate = useNavigate();
  const handleStart = () => {
    console.log('시작 버튼을 클릭');
    navigate('/cross-word');
  };
  return (
    <Puzzle>
      <ImgBox></ImgBox>
      <div className="puzzle-board">
        <h1>CrossWord</h1>
        <span>십자말 풀이를 완성해보세요!</span>
        <Button
          className="start-button"
          variant="contained"
          size="large"
          onClick={handleStart}
          style={{
            marginTop: '40px',
            padding: '0 12px',
            width: '15vw',
            height: '15vh',
            borderRadius: '15px',
            fontSize: '40px',
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

export default CrossWordCoverPage;
