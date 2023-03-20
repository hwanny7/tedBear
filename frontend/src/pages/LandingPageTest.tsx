import styled, { keyframes } from 'styled-components';
import { device } from 'utils/mediaQuery';
// visual svg
import LandingVisual from 'assets/img/landingVisual.svg';
import Smog from 'assets/img/landingSmog.svg';
import Cloud from 'assets/img/landingCloud.svg';
import LandingBear from 'assets/img/landingBear.svg';
// toggle svg
import Sun from 'assets/img/sun.svg';
import Moon from 'assets/img/moon.svg';
import { SetStateAction } from 'react';

// 인터페이스
interface Props {
  toggle: boolean;
  setToggle: React.Dispatch<SetStateAction<boolean>>;
}

interface ToggleStyledProps {
  toggle: boolean;
}

// /////////////////////////////////////////////////////////////
const Wrapper = styled.div`
  background-color: ${props => props.theme.bgColor};
`;

// 상단 비주얼 /////////////////////////////////////////////////////////////////////////////////////////
const Visual = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: ${props => props.theme.mainColor};

  @media ${device.mobile} {
    height: 500px;
  }

  @media ${device.tablet} {
    height: 600px;
  }

  @media ${device.laptop} {
    height: 700px;
  }

  @media ${device.desktop} {
    height: 700px;
  }
`;

// 사이트 대문 배경
const LandingVisualImg = styled.img<ToggleStyledProps>`
  position: absolute;
  width: 100%;
  bottom: 0%;
  filter: ${ToggleStyledProps =>
    !ToggleStyledProps.toggle
      ? 'invert(100%) sepia(6%) saturate(32%) hue-rotate(244deg) brightness(113%) contrast(84%)'
      : 'invert(13%) sepia(0%) saturate(1229%) hue-rotate(166deg) brightness(94%) contrast(76%)'};
`;

// 라이트모드, 다크모드 설정 토글
const ToggleBox = styled.div`
  /* background-color: ${props => props.theme.mainColor}; */
  width: 100%;
  height: 10%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: end;
  padding-right: 32px;
`;

const ToggleBtn = styled.div`
  background-image: -webkit-linear-gradient(
    #b3b3b3 0%,
    #ececec 80%,
    #ececec 100%
  );
  border-radius: 50px;
  position: relative;
  width: 56px;
  height: 16px;
  display: flex;
  align-items: center;
`;

const Circle = styled.div<ToggleStyledProps>`
  background: ${ToggleStyledProps =>
    !ToggleStyledProps.toggle
      ? 'linear-gradient(270deg, #4cb0b9 0%, #47bcc7 30%, #65e3ee 80%)'
      : 'linear-gradient(90deg, #000000 0%, #3f0e63 90%, #331056 100%)'};
  width: 32px;
  height: 32px;
  z-index: 999;
  position: absolute;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 2px 2px 4px #00000053;
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55) 0s;
  ${ToggleStyledProps =>
    ToggleStyledProps.toggle &&
    `
      transform: translateX(24px);
    `}
`;

const SunImg = styled.img`
  width: 70%;
`;

const MoonImg = styled(SunImg)`
  width: 100%;
`;

// 사이트 대문
const VisualContent = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  position: relative;

  align-items: center;
  text-align: center;

  @media ${device.mobile} {
    flex-direction: column;
    justify-content: center;
  }

  @media ${device.tablet} {
    flex-direction: column;
    justify-content: center;
  }

  @media ${device.laptop} {
    flex-direction: row;
    justify-content: start;
  }

  @media ${device.desktop} {
    flex-direction: row;
    justify-content: start;
  }
`;

// 사이트 대문 컨텐트 - Text / Img / Button
const TextBox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  border: 1px solid red;

  @media ${device.mobile} {
    width: 100%;
    height: 40%;
  }

  @media ${device.tablet} {
    width: 100%;
    height: 40%;
  }

  @media ${device.laptop} {
    width: 60%;
    height: 100%;
  }

  @media ${device.desktop} {
    width: 60%;
    height: 100%;
  }
`;

const Title = styled.div`
  /* background-color: black; */
  position: absolute;
  font-weight: bold;
  color: white;

  span {
    color: ${props => props.theme.pointLightColor};
    font-weight: bold;
  }

  @media ${device.mobile} {
    top: 20%;
    font-size: 30px;
  }

  @media ${device.tablet} {
    top: 20%;
    font-size: 36px;
  }

  @media ${device.laptop} {
    top: 24%;
    font-size: 36px;
    left: 10%;
  }

  @media ${device.desktop} {
    top: 15%;
    font-size: 40px;
    left: 20%;
  }

  @media (min-width: 1166px) {
    top: 10%;
    font-size: 48px;
    left: 20%;
  }
`;

const SubTitle = styled.div`
  position: absolute;
  color: white;

  @media ${device.mobile} {
    top: 45%;
    font-size: 16px;
  }

  @media ${device.tablet} {
    top: 45%;
    font-size: 18px;
  }

  @media ${device.laptop} {
    top: 35%;
    font-size: 18px;
    left: 10%;
  }

  @media ${device.desktop} {
    top: 23%;
    font-size: 18px;
    left: 20%;
  }
`;

const ImgBox = styled.div`
  border: 1px solid red;
  position: relative;
  display: flex;
  justify-content: center;

  @media ${device.mobile} {
    padding-top: 10px;
    width: 50%;
    height: 60%;
  }

  @media ${device.tablet} {
    padding-top: 10px;
    width: 50%;
    height: 60%;
  }

  @media ${device.laptop} {
    width: 350px;
    height: 100%;
  }

  @media ${device.desktop} {
    width: 450px;
    height: 100%;
  }
`;

const SmogImg = styled.img`
  position: absolute;

  @media ${device.mobile} {
    /* top: 0px; */
    /* left: 0px; */
    width: 200px;
  }

  @media ${device.tablet} {
    width: 200px;
  }

  @media ${device.laptop} {
    top: 100px;
    width: 300px;
  }

  @media ${device.desktop} {
    top: 20px;
    left: 10px;
    width: 400px;
  }

  @media (min-width: 1166px) {
    top: 10px;
    left: 20px;
    width: 400px;
  }
`;

const CloudImg = styled.img`
  position: absolute;

  @media ${device.mobile} {
    width: 80px;
    top: 40px;
    left: 0px;
  }

  @media ${device.tablet} {
    width: 80px;
    top: 40px;
    left: 10px;
  }

  @media (min-width: 600px) {
    width: 80px;
    top: 40px;
    left: 40px;
  }

  @media (min-width: 700px) {
    width: 80px;
    top: 40px;
    left: 70px;
  }

  @media ${device.laptop} {
    top: 150px;
    width: 120px;
    left: 0px;
  }

  @media ${device.desktop} {
    top: 100px;
    width: 160px;
    left: 0px;
  }

  @media (min-width: 1166px) {
    top: 90px;
    width: 160px;
    left: 0px;
  }
`;

const CloudImg2 = styled.img`
  position: absolute;

  @media ${device.mobile} {
    width: 60px;
    top: 70px;
    right: 0px;
  }

  @media ${device.tablet} {
    width: 60px;
    top: 70px;
    right: 30px;
  }

  @media (min-width: 600px) {
    width: 60px;
    top: 70px;
    right: 50px;
  }

  @media (min-width: 700px) {
    width: 60px;
    top: 70px;
    right: 90px;
  }

  @media ${device.laptop} {
    width: 100px;
    top: 190px;
    right: 50px;
  }

  @media ${device.desktop} {
    width: 120px;
    top: 160px;
    right: 50px;
  }

  @media (min-width: 1166px) {
    width: 120px;
    top: 150px;
    right: 100px;
  }
`;

const LandingBearImg = styled.img`
  position: absolute;

  @media ${device.mobile} {
    top: 40px;
    /* left: 0px; */
    width: 180px;
  }

  @media ${device.tablet} {
    top: 40px;
    width: 200px;
  }

  @media ${device.laptop} {
    top: 150px;
    width: 300px;
  }

  @media ${device.desktop} {
    top: 100px;
    left: 10px;
    width: 400px;
  }

  @media (min-width: 1166px) {
    top: 90px;
    left: 20px;
    width: 400px;
  }
`;

const StartBtn = styled.button`
  background-color: ${props => props.theme.pointColor};
  color: white;
  position: absolute;
  border-radius: 50px;
  cursor: pointer;
  box-shadow: 0.347vw 0.347vw 0.694vw rgba(0, 0, 0, 0.16);

  @media ${device.mobile} {
    top: 70%;
    font-size: 16px;
    padding: 12px 39px;
  }

  @media ${device.tablet} {
    top: 70%;
    font-size: 18px;
    padding: 16px 52px;
  }

  @media ${device.laptop} {
    top: 45%;
    font-size: 18px;
    padding: 16px 52px;
    left: 10%;
  }

  @media ${device.desktop} {
    top: 35%;
    font-size: 18px;
    padding: 16px 52px;
    left: 20%;
  }
`;

// 내용
const Content = styled.div`
  /* border: 1px solid black; */
  min-height: 600px;
  background-color: red;
`;

const LandingPageTest = (props: Props) => {
  // 다크모드, 라이트모드 설정
  const clickedToggle = () => {
    props.setToggle(!props.toggle);
  };

  return (
    <Wrapper>
      <Visual>
        <LandingVisualImg src={LandingVisual} toggle={props.toggle} />
        <ToggleBox>
          <ToggleBtn>
            <Circle onClick={clickedToggle} toggle={props.toggle}>
              {props.toggle ? <MoonImg src={Moon} /> : <SunImg src={Sun} />}
            </Circle>
          </ToggleBtn>
        </ToggleBox>
        <VisualContent>
          <TextBox>
            <Title>
              Let&apos;s Learn with <span>TedBear</span>
            </Title>
            <SubTitle>TedBear로 영어 스피킹 연습을 해보세요!</SubTitle>
            <StartBtn>Get Started</StartBtn>
          </TextBox>
          <ImgBox>
            <SmogImg src={Smog} />
            <CloudImg src={Cloud} />
            <CloudImg2 src={Cloud} />
            <LandingBearImg src={LandingBear} />
          </ImgBox>
        </VisualContent>
      </Visual>
      <Content></Content>
    </Wrapper>
  );
};

export default LandingPageTest;
