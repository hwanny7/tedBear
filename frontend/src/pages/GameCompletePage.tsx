import { Button } from '@mui/material';
import { Stack } from '@mui/system';
import Complete from 'assets/img/complete.svg';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledComplete = styled.div`
  height: 100%;
  width: 100%;
  background-image: url(${Complete});
  background-size: contain;
  background-repeat: no-repeat;
  justify-content: center;
`;

const GameCompletePage = () => {
  const navigate = useNavigate();
  const handleHome = () => {
    navigate('/home');
  };
  const handleRe = () => {
    navigate('/game');
  };
  return (
    <StyledComplete>
      <div className="whole">
        <Stack
          className="buttons"
          display="flex"
          flexDirection="row"
          justifyContent="center"
        >
          <Button
            className="button-1"
            variant="contained"
            style={{
              marginRight: '30px',
              marginTop: '550px',
              backgroundColor: '#FEAD55',
              fontSize: '40px',
              padding: '0 12px',
              width: '15vw',
              height: '15vh',
              borderRadius: '15px',
            }}
            onClick={handleHome}
          >
            홈으로
          </Button>
          <Button
            className="button-2"
            variant="contained"
            style={{
              marginLeft: '30px',
              marginTop: '550px',
              backgroundColor: '#FEAD55',
              fontSize: '40px',
              padding: '0 12px',
              width: '15vw',
              height: '15vh',
              borderRadius: '15px',
            }}
            onClick={handleRe}
          >
            다시하기
          </Button>
        </Stack>
      </div>
    </StyledComplete>
  );
};

export default GameCompletePage;
