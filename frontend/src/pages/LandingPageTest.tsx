import styled, { css, keyframes } from 'styled-components';
import { device } from 'utils/mediaQuery';
import { InView } from 'react-intersection-observer';

// full page
import { FullPage, Slide } from 'react-full-page';

//로그인 모달
import LoginModal from 'components/profile/LoginModal';

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

// Box3 svg
import LandingMovingBg from 'assets/img/landingMovingBg.svg';
import LandingArrow from 'assets/img/landingArrow.svg';
import LandingMonitor from 'assets/img/landingMonitor.svg';
import LandingBall1 from 'assets/img/landingBall1.svg';
import LandingBall2 from 'assets/img/landingBall2.svg';
import LandingBall3 from 'assets/img/landingBall3.svg';
import LandingCircle from 'assets/img/landingCircle.svg';

// Box2 svg
import LandingMan1 from 'assets/img/landingMan1.svg';
import LandingMan2 from 'assets/img/landingMan2.svg';
import Bubble from 'assets/img/bubble.svg';
import BigLogo from 'assets/img/bigLogo.svg';

// 인터페이스
interface Props {
  toggle: boolean;
  setToggle: React.Dispatch<SetStateAction<boolean>>;
}

interface ToggleStyledProps {
  toggle: boolean;
}

interface AnimationStyledProps1 {
  inView1: boolean;
}

interface AnimationStyledProps2 {
  inView2: boolean;
}

interface AnimationStyledProps3 {
  inView3: boolean;
}

interface AnimationStyledProps4 {
  inView4: boolean;
}

interface OpenBoxProps {
  openBox: boolean;
  boxIndex: number;
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

const bgMove = keyframes`
  from{
    transform: translate(0%,0%);
  }to{
    transform: translate(10%, -20%);
  }
`;

const fadeOut = keyframes`
  from{
    width: 100%;
  }to{
    width: 0%;
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
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  background: ${ToggleStyledProps =>
    !ToggleStyledProps.toggle
      ? 'linear-gradient( 300deg,#8c82c3 0%,#6558a6 30%,#584c93 60%,#38315d 100%)'
      : 'linear-gradient( 300deg,#4c4669 0%,#322b4e 30%,#231f37 60%,#110f1b 100%)'};

  @media ${device.mobile} {
    /* height: 500px; */
  }

  @media ${device.tablet} {
    /* height: 600px; */
  }

  @media ${device.laptop} {
    /* height: 700px; */
  }

  @media ${device.desktop} {
    /* height: 700px; */
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

const SubTitle = styled.div<AnimationStyledProps1>`
  position: absolute;
  color: white;
  border-right: 2px solid;
  overflow: hidden;
  white-space: nowrap;
  width: 33.1ch;

  ${AnimationStyledProps1 =>
    AnimationStyledProps1.inView1
      ? css`
          animation: ${typing} 2s steps(34), ${blink} 1s steps(1);
        `
      : ``}

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
// const Content = styled.div`
//   /* border: 1px solid black; */
//   min-height: 600px;
//   /* background-color: red; */

//   @media ${device.mobile} {
//     margin-top: 0px;
//   }

//   @media ${device.tablet} {
//     margin-top: 0px;
//   }

//   @media ${device.laptop} {
//     margin-top: 50px;
//   }

//   @media ${device.desktop} {
//     margin-top: 50px;
//   }
// `;

// BOX1
const Box1 = styled.div`
  background-color: ${props => props.theme.bgColor};
  position: relative;
  height: 100%;
  z-index: 1;

  @media ${device.mobile} {
    /* padding: 0 24px; */
    padding-top: 56px;
  }

  @media ${device.tablet} {
    padding-top: 56px;
    /* padding: 0 24px; */
  }

  @media ${device.laptop} {
    padding-top: 56px;
    /* padding: 64px 0px 0px; */
  }

  @media ${device.desktop} {
    padding: 80px 0px 64px;
  }
`;

const BackBox = styled.div<ToggleStyledProps>`
  background-color: ${ToggleStyledProps =>
    !ToggleStyledProps.toggle ? ' #fff6ec' : ' #3535357b'};
  position: absolute;

  width: 100%;
  top: 0px;
  z-index: 0;

  @media ${device.mobile} {
    min-height: 30%;
  }

  @media ${device.tablet} {
    min-height: 30%;
  }

  @media ${device.laptop} {
    min-height: 30%;
  }

  @media ${device.desktop} {
    min-height: 60%;
  }
`;

const TextTitle1 = styled.div<AnimationStyledProps2>`
  text-align: center;
  font-weight: bold;
  color: ${props => props.theme.textColor1};
  position: relative;
  z-index: 1;

  ${AnimationStyledProps2 =>
    AnimationStyledProps2.inView2
      ? css`
          animation: 1s ease-in-out 0s 1 normal none running ${fadeIn2};
        `
      : ``}

  span {
    font-weight: bold;
    color: ${props => props.theme.pointColor};
  }

  @media ${device.mobile} {
    font-size: 20px;
    /* padding-left: 32px; */
  }

  @media ${device.tablet} {
    font-size: 20px;
    /* padding-left: 32px; */
  }

  @media ${device.laptop} {
    font-size: 20px;
    /* padding-left: 32px; */
  }

  @media ${device.desktop} {
    font-size: 32px;
    /* padding-left: 54px; */
  }
`;

const TextSubTitle1 = styled.div<AnimationStyledProps2>`
  text-align: center;
  color: ${props => props.theme.textColor2};
  position: relative;
  z-index: 1;

  ${AnimationStyledProps2 =>
    AnimationStyledProps2.inView2
      ? css`
          animation: 1s ease-in-out 0s 1 normal none running ${fadeIn2};
        `
      : ``}

  @media ${device.mobile} {
    font-size: 12px;
    /* padding-left: 32px; */
    margin-top: 8px;
    > p {
      line-height: 24px;
    }
  }

  @media ${device.tablet} {
    font-size: 12px;
    /* padding-left: 32px; */
    margin-top: 8px;
    > p {
      line-height: 24px;
    }
  }

  @media ${device.laptop} {
    font-size: 12px;
    /* padding-left: 32px; */
    margin-top: 8px;
    > p {
      line-height: 24px;
    }
  }

  @media ${device.desktop} {
    font-size: 20px;
    /* padding-left: 54px; */
    margin-top: 16px;
    > p {
      line-height: 32px;
    }
  }
`;

const DescList = styled.ul`
  /* border: 1px solid red; */
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;

  @media ${device.mobile} {
    padding: 0px 24px;
    margin-top: 64px;
  }

  @media ${device.tablet} {
    padding: 0px 24px;
    margin-top: 56px;
  }

  @media ${device.laptop} {
    padding: 0 24px;
    margin-top: 64px;
  }

  @media ${device.desktop} {
    padding: 0 48px;
    margin-top: 64px;
  }
`;

const LandingVideoImg = styled.img`
  @media ${device.mobile} {
    margin-bottom: 24px;
    width: 50px;
  }

  @media ${device.tablet} {
    margin-bottom: 24px;
    width: 50px;
  }

  @media ${device.laptop} {
    margin-bottom: 0px;
    width: 64px;
  }

  @media ${device.desktop} {
    margin-bottom: 32px;
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
    font-size: 16px;
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
    font-size: 8px;
    line-height: 14px;
    margin: 0 8px;
  }

  @media ${device.laptop} {
    font-size: 14px;
    line-height: 20px;
    margin: 0 8px;
  }

  @media ${device.desktop} {
    font-size: 16px;
    line-height: 26px;
    margin: 0 8px;
  }
`;

const DescListEl1 = styled.li`
  width: 20%;
  border-top-left-radius: 40px;
  border-bottom-right-radius: 40px;
  box-shadow: 6px 6px 20px #61616142;

  position: relative;
  background: ${props => props.theme.bgColor};
  // 1.5s ease-in-out 0s 1 normal none running ${fadeIn2};
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 45%;
    padding: 24px 8px;
    div {
      text-align: center;
    }
    /* min-height: 200px; */
  }

  @media ${device.tablet} {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 45%;
    padding: 24px 8px;
    div {
      text-align: center;
    }
    /* min-height: 300px; */
  }

  @media ${device.laptop} {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 45%;
    padding: 48px 8px;
    div {
      margin-left: 32px;
    }
    /* min-height: 400px; */
  }

  @media ${device.desktop} {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 20%;
    padding: 64px 0px;
    div {
      margin-left: 0px;
      text-align: center;
    }
    /* min-height: 400px; */
  }
`;
const DescListEl2 = styled(DescListEl1)``;
const DescListEl3 = styled(DescListEl1)``;
const DescListEl4 = styled(DescListEl1)``;

const Box3 = styled.div<ToggleStyledProps>`
  background-color: ${props => props.theme.bgColor};
  position: relative;
  height: 100%;
  display: flex;

  @media ${device.mobile} {
    padding-top: 56px;
  }

  @media ${device.tablet} {
    padding-top: 56px;
  }

  @media ${device.laptop} {
    padding-top: 56px;
  }

  @media ${device.desktop} {
    padding: 100px 56px 80px;
    flex-direction: row;
  }
`;

const ContentLeft = styled.div`
  /* border: 1px solid red; */
  width: 30%;
  height: 100%;
  position: relative;
`;

const TextTitle2 = styled.div`
  text-align: left;
  font-weight: bold;
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
    font-size: 20px;
    padding-left: 32px;
  }

  @media ${device.laptop} {
    font-size: 20px;
    padding-left: 32px;
  }

  @media ${device.desktop} {
    font-size: 64px;
    padding-left: 54px;
  }
`;

const TextSubTitle2 = styled.div`
  text-align: left;
  color: ${props => props.theme.textColor1};
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
    font-size: 12px;
    padding-left: 32px;
    margin-top: 8px;
    > p {
      line-height: 24px;
    }
  }

  @media ${device.laptop} {
    font-size: 12px;
    padding-left: 32px;
    margin-top: 8px;
    > p {
      line-height: 24px;
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

const LandingMan1Img = styled.img`
  position: absolute;
  z-index: 1;
  bottom: 0;
  left: 30px;
  width: 300px;
`;

const LandingMan2Img = styled(LandingMan1Img)`
  left: 200px;
  width: 290px;
  bottom: 0px;
`;

const LandingCircleImg = styled.img`
  position: absolute;
  width: 380px;
  left: -30px;
  bottom: -10px;
  z-index: 0;
`;

const LandingMonitorImg = styled.img`
  position: absolute;
  z-index: 1;
  bottom: 0;
  left: 30px;
  width: 300px;
`;

const LandingBall1Img = styled(LandingMonitorImg)`
  bottom: 180px;
  left: 30px;
  width: 150px;
  animation: 1.4s infinite ease-in-out alternate ${upDown};
`;

const LandingBall2Img = styled(LandingMonitorImg)`
  bottom: 30px;
  left: 80px;
  width: 110px;
  animation: 1.2s infinite ease-in-out alternate ${upDown};
`;

const LandingBall3Img = styled(LandingMonitorImg)`
  bottom: 160px;
  left: 220px;
  width: 90px;
  animation: 1.6s infinite ease-in-out alternate ${upDown};
`;

const ContentRight = styled.div`
  /* border: 1px solid red; */
  height: 100%;
  width: 70%;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const DetatilWrapper = styled.ul`
  border-top: 2px solid black;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const LandingArrowImg = styled.img`
  width: 20px;
  transition: all 0.3s ease-out;
`;

const DetailEl = styled.li<OpenBoxProps>`
  border-bottom: 1px solid #cccccc;
  width: 100%;
  height: 25%;
  display: flex;
  align-items: center;
  transition: all 0.3s ease-out;
  color: ${props => props.theme.textColor1};

  &:hover {
    background-color: #fff6ecb9;
    color: ${props => props.theme.blackColor};

    > div:nth-child(3) > div {
      /* background: linear-gradient(
        36deg,
        #7f74bb 0%,
        #968ec2 5%,
        #f4c6b2 60%,
        #ffe1be 100%
      ); */
    }
  }

  > div {
    height: 100%;
    display: flex;
    align-items: center;

    &:nth-child(1) {
      /* border: 1px solid red; */
      width: 15%;
      justify-content: center;
      font-weight: bold;
      font-size: 40px;
    }
    &:nth-child(2) {
      /* border: 1px solid red; */
      width: 70%;
      justify-content: left;
      padding-left: 72px;
      font-size: 20px;
    }
    &:nth-child(3) {
      width: 15%;
      justify-content: center;
      align-items: center;

      > div {
        padding: 16px;
        display: flex;
        align-items: center;
        border-radius: 50%;
        cursor: pointer;
      }
    }
  }

  ${OpenBoxProps =>
    OpenBoxProps.openBox
      ? `
      
  &:not(:nth-child(${OpenBoxProps.boxIndex})) {
    display: none;
  }


  > div{
  &:nth-child(3)  {
      > div> ${LandingArrowImg} {
       transform:  rotate(90deg);
      }
    }
  }
}
  `
      : null};
`;

const DetailElDesc = styled.li<OpenBoxProps>`
  border-bottom: 1px solid #cccccc;
  width: 100%;
  height: 75%;
  align-items: center;
  display: none;
  ${OpenBoxProps =>
    OpenBoxProps.openBox
      ? `
   &:nth-child(${OpenBoxProps.boxIndex + 1}) {
    display: block;
  }
  `
      : `display: none;`}
`;

const Box2 = styled.div<AnimationStyledProps4>`
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
  background-color: #4e4483;
  padding: 128px 50px;
  display: flex;
  flex-direction: column;
  align-items: center;

  > div {
    &:last-child {
      background-color: #4e4483;
      position: relative;
      width: 300px;
      height: 100%;
      display: flex;
      justify-content: right;

      > div {
        background-color: #4e4483;
        height: 100%;
        position: absolute;
        bottom: 0;

        ${AnimationStyledProps4 =>
          AnimationStyledProps4.inView4
            ? css`
                animation: 1.5s ease-in-out ${fadeOut};
              `
            : ``}
      }
    }
  }
`;

const TextTitle3 = styled.div`
  text-align: center;
  font-weight: bold;
  color: ${props => props.theme.whiteColor};
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
    font-size: 20px;
    padding-left: 32px;
  }

  @media ${device.laptop} {
    font-size: 20px;
    padding-left: 32px;
  }

  @media ${device.desktop} {
    font-size: 32px;
    padding-left: 54px;
    line-height: 48px;
  }
`;

const TextSubTitle3 = styled.div`
  text-align: center;
  color: #edd1ff;
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
    font-size: 12px;
    padding-left: 32px;
    margin-top: 8px;
    > p {
      line-height: 24px;
    }
  }

  @media ${device.laptop} {
    font-size: 12px;
    padding-left: 32px;
    margin-top: 8px;
    > p {
      line-height: 24px;
    }
  }

  @media ${device.desktop} {
    font-size: 20px;
    padding-left: 54px;
    margin-top: 32px;
    > p {
      line-height: 32px;
    }
  }
`;

const BigLogoImg = styled.img`
  width: 300px;
  margin-top: 80px;
  position: absolute;
  bottom: 0;
`;

const BubbleImg = styled.img``;

const BubbleTxt1 = styled.div`
  > ${BubbleImg} {
    position: absolute;
    width: 350px;
    top: 110px;
    left: 240px;
  }

  > p {
    position: absolute;
    top: 180px;
    left: 300px;
    text-align: center;
    /* font-weight: bold; */
    font-size: 20px;
  }
`;

const BubbleTxt2 = styled(BubbleTxt1)`
  > ${BubbleImg} {
    right: 240px;
    left: auto;
    transform: scaleX(-1);
  }

  > p {
    right: 290px;
    left: auto;
  }
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

const LandingPageTest = (props: Props) => {
  // 로그인 팝업창
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  // 다크모드, 라이트모드 설정
  const clickedToggle = () => {
    props.setToggle(!props.toggle);
  };

  // 스크롤 애니메이션
  // ref
  const firstBox = useRef<HTMLDivElement>(null);
  const descList = useRef<HTMLUListElement>(null);

  // 애니메이션 적용
  const [animation, setAnimation] = useState<boolean>(false);
  const [inView1, setInView1] = useState<boolean>(false);
  const [inView2, setInView2] = useState<boolean>(false);
  const [inView4, setInView4] = useState<boolean>(false);

  // box 열기
  const [openBox, setOpenBox] = useState<boolean>(false);
  const [boxIndex, setBoxIndex] = useState<number>(0);
  const onOpenBox = (el: number) => {
    setOpenBox(!openBox);
    setBoxIndex(el);
  };

  return (
    <Wrapper>
      <FullPage duration={100}>
        {modalOpen && <LoginModal setOpenModal={setModalOpen} />}
        <Slide>
          <Visual toggle={props.toggle}>
            {/* <LandingVisualImg src={LandingVisual} toggle={props.toggle} /> */}
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
                <SubTitle inView1={inView1}>
                  TedBear로 영어 스피킹 연습을 해보세요!
                  <InView onChange={setInView1}></InView>
                </SubTitle>
                <StartBtn onClick={() => setModalOpen(true)}>
                  Get Started
                </StartBtn>
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
        </Slide>
        <Slide>
          <Box1 ref={firstBox}>
            <InView onChange={setInView2}></InView>
            <BackBox toggle={props.toggle}></BackBox>
            <TextTitle1 inView2={inView2}>
              <span>테드베어(TEDBEAR)</span>는?
            </TextTitle1>
            <TextSubTitle1 inView2={inView2}>
              <p>
                테드로 영어를 쉽게 배울 수 있는 사이트입니다.
                <br />
                테드에서 제공하는 다양한 주제의 강의로
                <br />
                회화 연습을 해보세요.
              </p>
            </TextSubTitle1>
            <DescList ref={descList}>
              <DescListEl1>
                <LandingVideoImg src={LandingVideo} />
                <div>
                  <ElTitle>VIDEO</ElTitle>
                  <ElDesc>
                    사용자 맞춤형
                    <br /> 다양한 TED 영상들을
                    <br /> 추천해줍니다.
                  </ElDesc>
                </div>
              </DescListEl1>
              <DescListEl2>
                <LandingMicImg src={LandingMic} />
                <div>
                  <ElTitle>SPEAKING</ElTitle>
                  <ElDesc>
                    TED 영상과 스크립트로 <br />
                    영어 스피킹 연습을 <br />할 수 있어요.
                  </ElDesc>
                </div>
              </DescListEl2>
              <DescListEl3>
                <LandingPuzzleImg src={LandingPuzzle} />
                <div>
                  <ElTitle>GAME</ElTitle>
                  <ElDesc>
                    재밌는 퍼즐 게임과 <br />
                    공부한 내용을 <br />
                    복습해보세요.
                  </ElDesc>
                </div>
              </DescListEl3>
              <DescListEl4>
                <LandingCheckImg src={LandingCheck} />
                <div>
                  <ElTitle>CHECK</ElTitle>
                  <ElDesc>
                    통계와 스트릭으로 <br />
                    사용자의 학습 상태를 <br />
                    체크할 수 있어요.
                  </ElDesc>
                </div>
              </DescListEl4>
            </DescList>
          </Box1>
        </Slide>
        <Slide>
          <Box3 toggle={props.toggle}>
            <ContentLeft>
              <TextTitle2>DETAIL</TextTitle2>
              <TextSubTitle2>
                <p>
                  TEDBEAR는 다음과 같은
                  <br /> 서비스를 제공합니다.
                </p>
              </TextSubTitle2>
              <LandingCircleImg src={LandingCircle} />
              <LandingMonitorImg src={LandingMonitor} />
              <LandingBall1Img src={LandingBall1} />
              <LandingBall2Img src={LandingBall2} />
              <LandingBall3Img src={LandingBall3} />
              {/* <LandingMan1Img src={LandingMan1} /> */}
              {/* <LandingMan2Img src={LandingMan2} /> */}
            </ContentLeft>
            <ContentRight>
              <DetatilWrapper>
                <DetailEl openBox={openBox} boxIndex={boxIndex}>
                  <div>1</div>
                  <div>난이도 기반 TED 영상 추천</div>
                  <div>
                    <div onClick={() => onOpenBox(1)}>
                      <LandingArrowImg src={LandingArrow} />
                    </div>
                  </div>
                </DetailEl>
                <DetailElDesc openBox={openBox} boxIndex={boxIndex}>
                  시연 영상2
                </DetailElDesc>
                <DetailEl openBox={openBox} boxIndex={boxIndex}>
                  <div>2</div>
                  <div>영어 스피킹 연습</div>
                  <div>
                    <div onClick={() => onOpenBox(3)}>
                      <LandingArrowImg src={LandingArrow} />
                    </div>
                  </div>
                </DetailEl>
                <DetailElDesc openBox={openBox} boxIndex={boxIndex}>
                  시연 영상4
                </DetailElDesc>
                <DetailEl openBox={openBox} boxIndex={boxIndex}>
                  <div>3</div>
                  <div>재밌는 게임으로 단어 실력 테스트</div>
                  <div>
                    <div onClick={() => onOpenBox(5)}>
                      <LandingArrowImg src={LandingArrow} />
                    </div>
                  </div>
                </DetailEl>
                <DetailElDesc openBox={openBox} boxIndex={boxIndex}>
                  시연 영상6
                </DetailElDesc>
                <DetailEl openBox={openBox} boxIndex={boxIndex}>
                  <div>4</div>
                  <div>사용자의 학습 상태 체크</div>
                  <div>
                    <div onClick={() => onOpenBox(7)}>
                      <LandingArrowImg src={LandingArrow} />
                    </div>
                  </div>
                </DetailEl>
                <DetailElDesc openBox={openBox} boxIndex={boxIndex}>
                  시연 영상7
                </DetailElDesc>
              </DetatilWrapper>
            </ContentRight>
          </Box3>
        </Slide>
        <Slide>
          <Box2 inView4={inView4}>
            {/* <LandingMovingBgDiv>
              <div></div>
            </LandingMovingBgDiv> */}
            <TextTitle3>
              TEDBEAR와 함께 <br />
              영어 공부 하실 준비가 되셨나요?
            </TextTitle3>
            <TextSubTitle3>
              <p>
                TEADBEAR에서 재밌게 영어 공부해서 영어 실력을 업그레이드
                해보세요!
              </p>
            </TextSubTitle3>
            <div>
              <InView onChange={setInView4}></InView>
              <BigLogoImg src={BigLogo} />
              <div></div>
            </div>
          </Box2>
        </Slide>
      </FullPage>
    </Wrapper>
  );
};

export default LandingPageTest;
