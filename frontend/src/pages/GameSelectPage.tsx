import styled, { keyframes } from 'styled-components';
import PuzzleIcon from 'assets/img/puzzleIcon.svg';
import CrosswordIcon from 'assets/img/crosswordIcon.svg';
import { useNavigate } from 'react-router-dom';

const upDown = keyframes`
    from{
    transform: translateY(0px);
  }
  to{
    transform: translateY(-10px);
  }
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;

  position: relative;

  @media (max-width: 900px) {
    padding: 56px 24px;
    flex-direction: column;
    justify-content: space-around;
  }

  @media (min-width: 900px) {
    flex-direction: row;
    padding: 56px 80px;
  }

  @media (min-width: 1200px) {
    padding: 56px 120px;
  }
`;

const Box = styled.div`
  word-break: keep-all;
  border-radius: 50px;
  width: 90%;
  height: 330px;
  box-shadow: 14px 14px 20px #9d9d9d42;
  cursor: pointer;
  position: relative;
  background-color: ${props => props.theme.learningBoxColor};

  display: flex;
  flex-direction: column;
  padding: 32px 64px;
  justify-content: end;

  @media (max-width: 400px) {
    padding: 32px 32px;
  }

  @media (max-width: 900px) {
    margin-bottom: 24px;
  }

  p:nth-child(2) {
    font-weight: bold;

    margin-bottom: 16px;
    color: ${props => props.theme.textColor1};

    @media (max-width: 400px) {
      font-size: 28px;
    }

    @media (min-width: 400px) {
      font-size: 32px;
    }

    @media (min-width: 900px) {
      font-size: 28px;
    }

    @media (min-width: 1200px) {
      font-size: 32px;
    }
  }

  p:nth-child(3) {
    margin-bottom: 16px;
    /* color: #ffffffad; */
    color: ${props => props.theme.textColor2};

    @media (max-width: 400px) {
      font-size: 16px;
    }

    @media (min-width: 400px) {
      font-size: 16px;
    }

    @media (min-width: 1200px) {
      font-size: 18px;
    }
  }

  &:hover {
    transform: scale(1.03);
    transition: 0.5s;
  }
`;

const PuzzleDiv = styled.div`
  /* border: 1px solid red; */
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 900px) {
    width: 100%;
    height: 40%;
  }
`;

const CrossDiv = styled.div`
  /* border: 1px solid red; */
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 900px) {
    width: 100%;
    height: 50%;
  }
`;

const PuzzleIconImg = styled.img`
  position: absolute;
  animation: 1.4s infinite ease-in-out alternate ${upDown};

  @media (max-width: 400px) {
    width: 140px;
    top: calc(50% - 130px);
    left: calc(50% - 20px);
  }

  @media (min-width: 400px) {
    width: 160px;
    top: calc(50% - 130px);
    left: calc(50%);
  }

  @media (min-width: 600px) {
    width: 240px;
    top: calc(50% - 150px);
    left: calc(50%);
  }

  @media (min-width: 900px) {
    width: 200px;
    top: calc(50% - 180px);
    left: calc(50% - 50px);
  }

  @media (min-width: 1200px) {
    width: 280px;
    top: calc(50% - 200px);
    left: calc(50% - 80px);
  }
`;

const CrosswordIconImg = styled(PuzzleIconImg)`
  @media (min-width: 900px) {
    width: 220px;
    top: calc(50% - 200px);
    left: calc(50% - 50px);
  }

  @media (min-width: 1200px) {
    width: 300px;
    top: calc(50% - 210px);
    left: calc(50% - 70px);
  }
`;

const GameSelectPage = () => {
  const navigate = useNavigate();

  const goPuzzle = () => {
    navigate('/game/detail');
  };

  const goCross = () => {
    navigate('/cross-word');
  };

  return (
    <Wrapper>
      <PuzzleDiv>
        <Box onClick={goPuzzle}>
          <PuzzleIconImg src={PuzzleIcon} />
          <p>퍼즐</p>
          <p>단어를 맞춰서 귀여운 그림을 모아보세요!</p>
        </Box>
      </PuzzleDiv>
      <CrossDiv>
        <Box onClick={goCross}>
          <CrosswordIconImg src={CrosswordIcon} />
          <p>십자말풀이</p>
          <p>단어를 맞춰서 격자판을 채워보세요! </p>
        </Box>
      </CrossDiv>
    </Wrapper>
  );
};

export default GameSelectPage;
