import styled, { css, keyframes } from 'styled-components';
import { device } from 'utils/mediaQuery';
// visual svg
import LandingVisual from 'assets/img/landingVisual.svg';
import Smog from 'assets/img/landingSmog.svg';
import Cloud from 'assets/img/landingCloud.svg';
import LandingBear from 'assets/img/landingBear.svg';
import Leaf1 from 'assets/img/landingLeaf1.svg';
import Leaf2 from 'assets/img/landingLeaf2.svg';
import Leaf3 from 'assets/img/landingLeaf3.svg';
import GreenBall from 'assets/img/greenBall.svg';
import PinkBall from 'assets/img/pinkBall.svg';

// toggle svg
import Sun from 'assets/img/sun.svg';
import Moon from 'assets/img/moon.svg';
import { SetStateAction, useEffect, useRef, useState } from 'react';

// Box1 svg
import LandingVideo from 'assets/img/landingVideo.svg';
import LandingPuzzle from 'assets/img/landingPuzzle.svg';
import LandingMic from 'assets/img/landingMic.svg';
import LandingCheck from 'assets/img/landingCheck.svg';

// 인터페이스
interface Props {
  toggle: boolean;
  setToggle: React.Dispatch<SetStateAction<boolean>>;
}

interface ToggleStyledProps {
  toggle: boolean;
}

interface AnimationStyledProps {
  animation: boolean;
}

// 애니메이션 keyframes ////////////////////////////////////////////////////////////////
const upDown = keyframes`
    from{
    transform: translateY(0px);
  }
  to{
    transform: translateY(-10px);
  }
`;

const rotate = keyframes` 
from{
  /* transform: translateY(0px); */
}
to{
  transform-origin : 0 100% rotate(10deg);
  transform: rotate(10deg);
}`;

const typing = keyframes`
  from {
    width: 0
  }
`;

const blink = keyframes`
  50% {
    border-color: transparent
  }
`;

const fadeIn1 = keyframes`
  from{
    transform: translateX(20px);
    opacity: 0;
  }
  to{
    transform: translateX(0px);
    opacity: 1;
  }
`;

const fadeIn2 = keyframes`
  from{
    transform: translateY(20px);
    opacity: 0;
  }
  to{
    transform: translateY(0px);
    opacity: 1;
  }
`;

// /////////////////////////////////////////////////////////////
const Wrapper = styled.div`
  background-color: ${props => props.theme.bgColor};
`;

// 상단 비주얼 /////////////////////////////////////////////////////////////////////////////////////////
const Visual = styled.div<ToggleStyledProps>`
  /* border: 1px solid red; */
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  background: ${ToggleStyledProps =>
    !ToggleStyledProps.toggle
      ? 'linear-gradient( 300deg,#8c82c3 0%,#6558a6 30%,#584c93 60%,#38315d 100%)'
      : 'linear-gradient( 300deg,#4c4669 0%,#322b4e 30%,#231f37 60%,#110f1b 100%)'};

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
      ? 'invert(100%) sepia(0%) saturate(0%) hue-rotate(98deg) brightness(102%) contrast(102%)'
      : 'invert(0%) sepia(10%) saturate(20%) hue-rotate(216deg) brightness(105%) contrast(100%)'};

  @media ${device.mobile} {
    opacity: 0;
  }

  @media ${device.tablet} {
    opacity: 0;
  }

  @media ${device.laptop} {
    opacity: 1;
  }

  @media ${device.desktop} {
    opacity: 1;
  }
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
  /* border: 1px solid red; */

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
    padding: 0 4px;
    top: 20%;
    font-size: 28px;
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
  border-right: 2px solid;
  animation: ${typing} 2s steps(34), ${blink} 1s steps(1) infinite;
  overflow: hidden;
  white-space: nowrap;
  width: 33.1ch;

  @media ${device.mobile} {
    top: 45%;
    font-size: 14px;
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
  /* border: 1px solid blue; */
  animation: 1s ease-in-out ${fadeIn1};
  position: relative;
  display: flex;
  justify-content: center;

  @media ${device.mobile} {
    margin-top: 30px;
    width: 230px;
    height: 60%;
  }

  @media ${device.tablet} {
    margin-top: 50px;
    width: 250px;
    height: 60%;
  }

  @media ${device.laptop} {
    margin-top: 0px;
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
  animation: 1.4s infinite ease-in-out alternate ${upDown};
  /* transform: translate(0px, 0px);s */

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
  animation: 2s infinite ease-in-out alternate ${upDown};

  @media ${device.mobile} {
    width: 60px;
    top: 70px;
    right: 20px;
  }

  @media ${device.tablet} {
    width: 60px;
    top: 70px;
    right: 30px;
  }

  @media ${device.laptop} {
    width: 100px;
    top: 190px;
    right: 30px;
  }

  @media ${device.desktop} {
    width: 120px;
    top: 160px;
    right: 50px;
  }

  @media (min-width: 1166px) {
    width: 120px;
    top: 150px;
    right: 30px;
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

const Leaf1Img = styled.img`
  position: absolute;
  animation: 0.8s cubic-bezier(0.05, -0.2, 0.31, 0.75) 0s infinite alternate
    none running ${rotate};

  @media ${device.mobile} {
    top: 110px;
    width: 70px;
    right: 10px;
  }

  @media ${device.tablet} {
    top: 110px;
    width: 90px;
    right: 10px;
  }

  @media ${device.laptop} {
    top: 250px;
    width: 160px;
    right: 0px;
  }

  @media ${device.desktop} {
    top: 230px;
    width: 200px;
    right: 0px;
  }

  @media (min-width: 1166px) {
    top: 220px;
    width: 200px;
    right: 0px;
  }
`;

const Leaf2Img = styled.img`
  position: absolute;
  animation: 1.2s cubic-bezier(0.05, -0.2, 0.31, 0.75) 0s infinite alternate
    none running ${rotate};

  @media ${device.mobile} {
    top: 120px;
    width: 70px;
    left: 0px;
  }

  @media ${device.tablet} {
    top: 130px;
    width: 90px;
    left: -10px;
  }

  @media ${device.laptop} {
    top: 260px;
    width: 160px;
    left: -40px;
  }

  @media ${device.desktop} {
    top: 260px;
    width: 200px;
    left: -70px;
  }

  @media (min-width: 1166px) {
    top: 250px;
    width: 200px;
    left: -60px;
  }
`;

const Leaf3Img = styled.img`
  position: absolute;

  @media ${device.mobile} {
    top: 200px;
    width: 70px;
    left: 40px;
  }

  @media ${device.tablet} {
    top: 220px;
    width: 90px;
    left: 40px;
  }

  @media ${device.laptop} {
    top: 420px;
    width: 160px;
    left: 40px;
  }

  @media ${device.desktop} {
    top: 460px;
    width: 200px;
    left: 40px;
  }

  @media (min-width: 1166px) {
    top: 460px;
    width: 200px;
    left: 40px;
  }
`;

const GreenBallImg = styled.img`
  position: absolute;

  @media ${device.mobile} {
    top: 180px;
    width: 40px;
    left: 10px;
  }

  @media ${device.tablet} {
    top: 200px;
    width: 50px;
    left: 5px;
  }

  @media ${device.laptop} {
    top: 390px;
    width: 80px;
    left: -10px;
  }

  @media ${device.desktop} {
    top: 420px;
    width: 100px;
    left: -20px;
  }

  @media (min-width: 1166px) {
    top: 410px;
    width: 100px;
    left: -10px;
  }
`;

const PinkBallImg = styled.img`
  position: absolute;

  @media ${device.mobile} {
    top: 170px;
    width: 60px;
    right: 20px;
  }

  @media ${device.tablet} {
    top: 190px;
    width: 70px;
    right: 20px;
  }

  @media ${device.laptop} {
    top: 380px;
    width: 100px;
    right: 20px;
  }

  @media ${device.desktop} {
    top: 410px;
    width: 120px;
    right: 30px;
  }

  @media (min-width: 1166px) {
    top: 400px;
    width: 120px;
    right: 20px;
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

  &:hover {
    background-color: #da6a36;
    transition: all 0.3s;
    transform: translateY(3px);
    /* box-shadow: 0 10px 20px rgba(255, 0, 0, 0.2); */
  }
`;

// 내용
const Content = styled.div`
  /* border: 1px solid black; */
  min-height: 600px;
  /* background-color: red; */

  @media ${device.mobile} {
    margin-top: 0px;
  }

  @media ${device.tablet} {
    margin-top: 0px;
  }

  @media ${device.laptop} {
    margin-top: 50px;
  }

  @media ${device.desktop} {
    margin-top: 50px;
  }
`;

// BOX1
const Box1 = styled.div`
  position: relative;
  padding: 80px 0px 64px;
`;

const BackBox = styled.div<ToggleStyledProps>`
  background-color: ${ToggleStyledProps =>
    !ToggleStyledProps.toggle ? ' #fff6ec' : ' #3535357b'};
  position: absolute;

  width: 100%;
  top: 0px;
  z-index: 0;

  @media ${device.mobile} {
    min-height: 40%;
  }

  @media ${device.tablet} {
    min-height: 40%;
  }

  @media ${device.laptop} {
    min-height: 40%;
  }

  @media ${device.desktop} {
    min-height: 60%;
  }
`;

const TextTitle1 = styled.div<AnimationStyledProps>`
  text-align: center;
  font-weight: bold;
  animation: ${AnimationStyledProps =>
    AnimationStyledProps.animation
      ? css`
   1s ease-in-out 0s 1 normal none running ${fadeIn2};
        `
      : ``};
  color: ${props => props.theme.textColor1};
  position: relative;
  z-index: 1;

  span {
    font-weight: bold;
    color: ${props => props.theme.pointColor};
  }

  @media ${device.mobile} {
    font-size: 20px;
    padding-left: 32px;
  }

  @media ${device.tablet} {
    font-size: 28px;
    padding-left: 32px;
  }

  @media ${device.laptop} {
    font-size: 32px;
    padding-left: 54px;
  }

  @media ${device.desktop} {
    font-size: 32px;
    padding-left: 54px;
  }
`;

const TextSubTitle1 = styled.div<AnimationStyledProps>`
  text-align: center;
  animation: ${AnimationStyledProps =>
    AnimationStyledProps.animation
      ? css`
    1s ease-in-out 0s 1 normal none running ${fadeIn2};
        `
      : ``};
  color: ${props => props.theme.textColor2};
  position: relative;
  z-index: 1;

  @media ${device.mobile} {
    font-size: 12px;
    padding-left: 32px;
    margin-top: 8px;
    > p {
      line-height: 24px;
    }
  }

  @media ${device.tablet} {
    font-size: 18px;
    padding-left: 32px;
    margin-top: 8px;
    > p {
      line-height: 30px;
    }
  }

  @media ${device.laptop} {
    font-size: 20px;
    padding-left: 54px;
    margin-top: 16px;
    > p {
      line-height: 32px;
    }
  }

  @media ${device.desktop} {
    font-size: 20px;
    padding-left: 54px;
    margin-top: 16px;
    > p {
      line-height: 32px;
    }
  }
`;

const DescList = styled.ul`
  margin-top: 64px;
  /* border: 1px solid red; */
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;

  @media ${device.mobile} {
    padding: 0 24px;
  }

  @media ${device.tablet} {
    padding: 0 24px;
  }

  @media ${device.laptop} {
    padding: 0 32px;
  }

  @media ${device.desktop} {
    padding: 0 48px;
  }
`;

const LandingVideoImg = styled.img`
  margin-bottom: 32px;
  @media ${device.mobile} {
    width: 50px;
  }

  @media ${device.tablet} {
    width: 70px;
  }

  @media ${device.laptop} {
    width: 100px;
  }

  @media ${device.desktop} {
    width: 30%;
  }
`;
const LandingMicImg = styled(LandingVideoImg)``;
const LandingPuzzleImg = styled(LandingVideoImg)``;
const LandingCheckImg = styled(LandingVideoImg)``;

const ElTitle = styled.div`
  font-weight: bold;
  color: ${props => props.theme.pointColor};
  margin-bottom: 16px;

  @media ${device.mobile} {
    font-size: 16px;
  }

  @media ${device.tablet} {
    font-size: 20px;
  }

  @media ${device.laptop} {
    font-size: 24px;
  }

  @media ${device.desktop} {
    font-size: 24px;
  }
`;

const ElDesc = styled.div`
  text-align: center;
  word-break: normal;

  @media ${device.mobile} {
    font-size: 8px;
    line-height: 14px;
    margin: 0 8px;
  }

  @media ${device.tablet} {
    font-size: 14px;
    line-height: 20px;
    margin: 0 8px;
  }

  @media ${device.laptop} {
    font-size: 16px;
    line-height: 26px;
    margin: 0 8px;
  }

  @media ${device.desktop} {
    font-size: 16px;
    line-height: 26px;
    margin: 0 8px;
  }
`;

const DescListEl1 = styled.li<AnimationStyledProps>`
  width: 20%;
  border-top-left-radius: 40px;
  border-bottom-right-radius: 40px;
  box-shadow: 6px 6px 20px #61616142;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  background: ${props => props.theme.bgColor};
  animation: ${AnimationStyledProps =>
    AnimationStyledProps.animation
      ? css`
   1.5s ease-in-out 0s 1 normal none running ${fadeIn2};
        `
      : ``};
  color: ${props => props.theme.textColor2};
  margin-bottom: 16px;

  &:hover {
    background: linear-gradient(
      36deg,
      #7f74bb 0%,
      #968ec2 20%,
      #f4c6b2 75%,
      #ffdbb3 100%
    );
    color: white;

    ${ElTitle} {
      transition: 0.8s;
      color: white;
    }

    ${LandingVideoImg} {
      transition: 0.8s;
      transform: scale(1.1);
    }

    ${ElDesc} {
      transition: 0.8s;
    }
  }

  @media ${device.mobile} {
    width: 45%;
    min-height: 200px;
  }

  @media ${device.tablet} {
    width: 45%;
    min-height: 300px;
  }

  @media ${device.laptop} {
    width: 40%;
    min-height: 400px;
  }

  @media ${device.desktop} {
    width: 20%;
    min-height: 400px;
  }
`;
const DescListEl2 = styled(DescListEl1)``;
const DescListEl3 = styled(DescListEl1)``;
const DescListEl4 = styled(DescListEl1)``;

const Box2 = styled.div`
  position: relative;
  margin: 54px 126px;
  border-radius: 50px;
  min-height: 600px;
  /* background-color: ${props => props.theme.mainLightColor}; */
`;

const LandingPageTest = (props: Props) => {
  // 다크모드, 라이트모드 설정
  const clickedToggle = () => {
    props.setToggle(!props.toggle);
  };

  // ref
  const firstBox = useRef<HTMLDivElement>(null);
  const descList = useRef<HTMLUListElement>(null);

  // 애니메이션 적용
  const [animation, setAnimation] = useState<boolean>(false);

  // 특정 영역 감지
  // const onCatch = () => {
  //   const viewHeight = window.innerHeight;
  //   console.log('현재 브라우저 높이 : ', viewHeight);
  //   const scrolltop = window.scrollY;
  //   console.log('현재 스크롤 위치 : ', scrolltop);
  //   // offset()은 Document 를 기준으로 하는 좌표를 구할 때 쓰입니다.
  //   // https://inpa.tistory.com/entry/JS-%F0%9F%9A%80-%EC%8A%A4%ED%81%AC%EB%A1%A4-%EB%82%B4%EB%A0%A4%EC%84%9C-%ED%8A%B9%EC%A0%95-%EC%98%81%EC%97%AD-%EA%B0%90%EC%A7%80%ED%95%98%EA%B8%B0
  // };

  // scroll event useEffect
  useEffect(() => {
    window.addEventListener('scroll', e => {
      // onCatch();
      const temp1 = window.scrollY + window.innerHeight;

      if (firstBox.current?.offsetTop && temp1 <= firstBox.current?.offsetTop) {
        // 현재 위치 도달 하면 animaton 추가
        setAnimation(true);
      }

      if (descList.current?.offsetTop && temp1 <= descList.current?.offsetTop) {
        setAnimation(true);
      }
      // setAnimation(false);
    });
  }, []);

  return (
    <Wrapper>
      <Visual toggle={props.toggle}>
        <LandingVisualImg src={LandingVisual} toggle={props.toggle} />
        {/* <BigWave1Img src={BigWave1} toggle={props.toggle} /> */}
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
            <Leaf1Img src={Leaf1} />
            <Leaf2Img src={Leaf2} />
            <Leaf3Img src={Leaf3} />
            <LandingBearImg src={LandingBear} />
            <GreenBallImg src={GreenBall} />
            <PinkBallImg src={PinkBall} />
          </ImgBox>
        </VisualContent>
      </Visual>
      <Content>
        <Box1 ref={firstBox}>
          <BackBox toggle={props.toggle}></BackBox>
          <TextTitle1 animation={animation}>
            <span>테드 베어(TEADBEAR)</span>는?
          </TextTitle1>
          <TextSubTitle1 animation={animation}>
            <p>
              테드로 영어를 쉽게 배울 수 있는 사이트입니다.
              <br />
              테드에서 제공하는 다양한 주제의 강의로
              <br />
              회화 연습을 해보세요.
            </p>
          </TextSubTitle1>
          <DescList ref={descList}>
            <DescListEl1 animation={animation}>
              <LandingVideoImg src={LandingVideo} />
              <ElTitle>VIDEO</ElTitle>
              <ElDesc>
                TEDBEAR는 사용자 맞춤형
                <br /> 다양한 TED 영상들을
                <br /> 추천해줍니다.
              </ElDesc>
            </DescListEl1>
            <DescListEl2 animation={animation}>
              <LandingMicImg src={LandingMic} />
              <ElTitle>SPEAKING</ElTitle>
              <ElDesc>
                Ted 영상과 스크립트로 <br />
                영어 스피킹 연습을 <br />할 수 있어요.
              </ElDesc>
            </DescListEl2>
            <DescListEl3 animation={animation}>
              <LandingPuzzleImg src={LandingPuzzle} />
              <ElTitle>GAME</ElTitle>
              <ElDesc>
                재밌는 퍼즐 게임으로 <br />
                공부한 내용을 <br />
                복습해보세요.
              </ElDesc>
            </DescListEl3>
            <DescListEl4 animation={animation}>
              <LandingCheckImg src={LandingCheck} />
              <ElTitle>CHECK</ElTitle>
              <ElDesc>
                통계와 스트릭으로 <br />
                사용자의 학습 상태를 <br />
                체크할 수 있어요.
              </ElDesc>
            </DescListEl4>
          </DescList>
        </Box1>
        <Box2></Box2>
      </Content>
    </Wrapper>
  );
};

export default LandingPageTest;
