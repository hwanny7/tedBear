import styled, { keyframes } from 'styled-components';
import LandingMovingBg from 'assets/img/landingMovingBg.svg';
import ErrorBear from 'assets/img/errorBear.svg';
import ErrorText from 'assets/img/errorText.svg';

const bgMove = keyframes`
  from{
    transform: translate(0%,0%);
  }to{
    transform: translate(10%, -20%);
  }
`;

// overflow hidden => 자식이 absolute면 부모 relative주기
const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
  /* display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; */
`;

const LandingMovingBgDiv = styled.div`
  position: absolute;
  bottom: 0px;
  right: 100%;
  width: 100%;
  height: 100%;
  z-index: 0;
  > div {
    background-image: url(${LandingMovingBg});
    background-repeat: repeat;
    width: 1000%;
    height: 1000%;
    animation: 100s linear 0s infinite normal none running ${bgMove};
  }
`;

const ErrorBearImg = styled.img`
  width: 500px;
  position: absolute;
  z-index: 1;
  top: 20%;
  left: calc(50% - 250px);
`;

const ErrorTextImg = styled.img`
  width: 500px;
  position: absolute;
  z-index: 1;
  top: 70%;
  left: calc(50% - 250px);
`;

const ErrorPage = () => {
  return (
    <Wrapper>
      <LandingMovingBgDiv>
        <div></div>
      </LandingMovingBgDiv>
      <ErrorBearImg src={ErrorBear} />
      <ErrorTextImg src={ErrorText} />
    </Wrapper>
  );
};

export default ErrorPage;
