import styled, { css, keyframes } from 'styled-components';
import { device } from 'utils/mediaQuery';
import { InView } from 'react-intersection-observer';
import { Cookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { logout } from 'redux/user';

// full page
// import { FullPage, Slide } from 'react-full-page';

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
import LandingImgTemp1 from 'assets/img/landingImgTemp1.svg';

// Box2 svg
import LandingMan1 from 'assets/img/landingMan1.svg';
import LandingMan2 from 'assets/img/landingMan2.svg';
import Bubble from 'assets/img/bubble.svg';
import BigLogo from 'assets/img/bigLogo.svg';
import { useNavigate } from 'react-router-dom';

import Top from 'assets/img/top.svg';

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
  toggle: boolean;
}

interface AnimationStyledProps3 {
  inView3: boolean;
  toggle: boolean;
}

interface AnimationStyledProps4 {
  inView4: boolean;
}

interface OpenBoxProps {
  openBox: boolean;
  boxIndex: number;
}

interface CarouselProps {
  selectedEl: number;
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
  overflow: hidden;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  /* background: ${ToggleStyledProps =>
    !ToggleStyledProps.toggle
      ? 'linear-gradient( 300deg,#8c82c3 0%,#6558a6 30%,#584c93 60%,#38315d 100%)'
      : 'linear-gradient( 300deg,#4c4669 0%,#322b4e 30%,#231f37 60%,#110f1b 100%)'}; */
  background-color: ${props => props.theme.bgColor2};

  @media ${device.mobile} {
    height: 500px;
    background-color: ${props => props.theme.mainColor};
  }

  @media ${device.tablet} {
    height: 600px;
    background-color: ${props => props.theme.mainColor};
  }

  @media ${device.laptop} {
    height: 750px;
    background-color: ${props => props.theme.bgColor2};
  }

  @media ${device.desktop} {
    height: 800px;
    background-color: ${props => props.theme.bgColor2};
  }
`;

const CircleDiv = styled.div`
  position: absolute;
  top: -1300px;
  left: -1000px;
  width: 5000px;

  height: 2000px;
  border-radius: 50%;
  background-color: ${props => props.theme.mainColor};

  @media ${device.mobile} {
    display: none;
  }

  @media ${device.tablet} {
    display: none;
  }

  @media ${device.laptop} {
    display: block;
  }

  @media ${device.desktop} {
    display: block;
  }
`;

const CircleDiv2 = styled(CircleDiv)`
  background-color: ${props => props.theme.mainLightColor};
  top: -1280px;
  left: -1200px;
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

  p {
    color: ${props => props.theme.whiteColor};
    position: absolute;
    text-decoration: underline;
    cursor: pointer;

    @media ${device.mobile} {
      top: 70%;
      font-size: 16px;
    }

    @media ${device.tablet} {
      top: 70%;
      font-size: 18px;
    }

    @media ${device.laptop} {
      top: 45%;
      font-size: 18px;
      left: 10%;
    }

    @media ${device.desktop} {
      top: 40%;
      font-size: 14px;
      left: 40%;
      font-weight: lighter;
    }
  }

  div:nth-child(3) {
    display: inline-block;
    position: absolute;

    @media ${device.mobile} {
      top: 70%;
      font-size: 16px;
    }

    @media ${device.tablet} {
      top: 70%;
      font-size: 18px;
    }

    @media ${device.laptop} {
      top: 45%;
      font-size: 18px;
      left: 10%;
    }

    @media ${device.desktop} {
      top: 35%;
      font-size: 18px;
      left: 20%;
    }
  }
`;

const Title = styled.div`
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
    font-size: 24px;
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
  width: 30.5ch;

  ${AnimationStyledProps1 =>
    AnimationStyledProps1.inView1
      ? css`
          animation: ${typing} 2s steps(24), ${blink} 1s steps(1);
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
  background-color: #f9e000;
  color: #1a1a1a;
  /* position: absolute; */
  border-radius: 16px;
  cursor: pointer;
  box-shadow: 0.347vw 0.347vw 0.694vw rgba(0, 0, 0, 0.16);
  margin-right: 24px;
  font-weight: bold;

  @media ${device.mobile} {
    top: 70%;
    font-size: 12px;
    padding: 10px 39px;
    border-radius: 8px;
  }

  @media ${device.tablet} {
    top: 70%;
    font-size: 18px;
    padding: 14px 52px;
  }

  @media ${device.laptop} {
    top: 45%;
    font-size: 18px;
    padding: 14px 52px;
    left: 10%;
  }

  @media ${device.desktop} {
    top: 35%;
    font-size: 18px;
    padding: 14px 52px;
    left: 20%;
  }

  &:hover {
    background-color: #f9cf00;
    transition: all 0.3s;
    transform: translateY(3px);
    /* box-shadow: 0 10px 20px rgba(255, 0, 0, 0.2); */
  }
`;

const GuestBtn = styled(StartBtn)`
  background-color: ${props => props.theme.whiteColor};
  color: #1a1a1a;
  margin-right: 0;

  &:hover {
    background-color: #fffacb;
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
    /* margin-top: 0px; */
  }

  @media ${device.tablet} {
    /* margin-top: 0px; */
  }

  @media ${device.laptop} {
    /* margin-top: 50px; */
  }

  @media ${device.desktop} {
    /* margin-top: 50px; */
  }
`;

// BOX1
const Box1 = styled.div<AnimationStyledProps2>`
  background-color: ${props => props.theme.bgColor2};
  position: relative;
  /* height: 500px; */
  z-index: 1;

  @media ${device.mobile} {
    /* padding: 0 24px; */
    padding-top: 56px;
    min-height: 750px;
  }

  @media ${device.tablet} {
    padding-top: 56px;
    /* padding: 0 24px; */
    min-height: 750px;
  }

  @media ${device.laptop} {
    padding-top: 56px;
    /* padding: 64px 0px 0px; */
    min-height: 800px;
  }

  @media ${device.desktop} {
    padding: 80px 0px 64px;
    min-height: 900px;
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
    min-height: 25%;
  }

  @media ${device.tablet} {
    min-height: 25%;
  }

  @media ${device.laptop} {
    min-height: 25%;
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
  opacity: 0;

  ${AnimationStyledProps2 =>
    AnimationStyledProps2.inView2
      ? css`
          animation: 0.5s ease-in-out 0s ${fadeIn2};
          animation-fill-mode: forwards;
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
  opacity: 0;

  ${AnimationStyledProps2 =>
    AnimationStyledProps2.inView2
      ? css`
          animation: 0.5s ease-in-out 0.3s ${fadeIn2};
          animation-fill-mode: forwards;
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

const DescListEl1 = styled.li<AnimationStyledProps2>`
  width: 20%;
  border-top-left-radius: 40px;
  border-bottom-right-radius: 40px;
  box-shadow: 6px 6px 20px #61616142;

  position: relative;
  background: ${props =>
    !props.toggle ? `${props.theme.whiteColor}` : `${props.theme.blackColor}`};
  // 1.5s ease-in-out 0s 1 normal none running ${fadeIn2};
  color: ${props => props.theme.textColor2};
  margin-bottom: 16px;

  opacity: 0;

  ${AnimationStyledProps2 =>
    AnimationStyledProps2.inView2
      ? css`
          animation: 0.5s ease-in-out 0.5s ${fadeIn2};
          animation-fill-mode: forwards;
        `
      : ``}

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
const DescListEl2 = styled(DescListEl1)<AnimationStyledProps2>`
  opacity: 0;

  ${AnimationStyledProps2 =>
    AnimationStyledProps2.inView2
      ? css`
          animation: 0.5s ease-in-out 0.7s ${fadeIn2};
          animation-fill-mode: forwards;
        `
      : ``}
`;
const DescListEl3 = styled(DescListEl1)<AnimationStyledProps2>`
  opacity: 0;

  ${AnimationStyledProps2 =>
    AnimationStyledProps2.inView2
      ? css`
          animation: 0.5s ease-in-out 0.9s ${fadeIn2};
          animation-fill-mode: forwards;
        `
      : ``}
`;
const DescListEl4 = styled(DescListEl1)<AnimationStyledProps2>`
  opacity: 0;

  ${AnimationStyledProps2 =>
    AnimationStyledProps2.inView2
      ? css`
          animation: 0.5s ease-in-out 1.1s ${fadeIn2};
          animation-fill-mode: forwards;
        `
      : ``}
`;

const Box3 = styled.div`
  background-color: ${props => props.theme.bgColor2};
  position: relative;
  /* height: 100%; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* border: 1px solid black; */
  width: 100%;

  @media ${device.mobile} {
    padding: 0px 0px 80px;
  }

  @media ${device.tablet} {
    padding: 0px 0px 160px;
  }

  @media ${device.laptop} {
    padding: 0px 0px 160px;
  }

  @media ${device.desktop} {
    padding: 0px 0px 160px;
  }
`;

const ButtonBox = styled.div<AnimationStyledProps3>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  /* width: 100%; */
  margin-bottom: 56px;

  opacity: 0;

  ${AnimationStyledProps3 =>
    AnimationStyledProps3.inView3
      ? css`
          animation: 0.5s ease-in-out 0s ${fadeIn2};
          animation-fill-mode: forwards;
        `
      : ``}
`;

const ButtonEl = styled.button<CarouselProps>`
  ${props => {
    return `
      &:nth-child(${props.selectedEl}){
        background-color:${props.theme.pointColor};
        color: white;
        border: 2px solid ${props.theme.pointColor};
      }
      &:not(:nth-child(${props.selectedEl})){
        background-color:${props.theme.bgColor2};
        color: ${props.theme.pointColor};
        border: 2px solid ${props.theme.pointColor};
      }
      `;
  }};

  cursor: pointer;

  @media ${device.mobile} {
    font-size: 10px;
    padding: 8px 24px;
    border-radius: 50px;
    margin-bottom: 0px;
    &:nth-child(2),
    &:nth-child(3),
    &:nth-child(4) {
      margin-left: 12px;
    }
  }

  @media ${device.tablet} {
    font-size: 14px;
    padding: 8px 32px;
    border-radius: 50px;
    margin-bottom: 0px;
    &:nth-child(2),
    &:nth-child(3),
    &:nth-child(4) {
      margin-left: 16px;
    }
  }

  @media ${device.laptop} {
    font-size: 20px;
    padding: 8px 32px;
    border-radius: 50px;
    margin-bottom: 24px;
    &:nth-child(2),
    &:nth-child(3),
    &:nth-child(4) {
      margin-left: 24px;
    }
  }

  @media ${device.desktop} {
    font-size: 20px;
    padding: 8px 32px;
    border-radius: 50px;
    margin-bottom: 24px;
    &:nth-child(2),
    &:nth-child(3),
    &:nth-child(4) {
      margin-left: 24px;
    }
  }
`;

const ContentBox = styled.div<AnimationStyledProps3>`
  /* border: 1px solid blue; */
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  overflow-x: hidden;

  opacity: 0;

  ${AnimationStyledProps3 =>
    AnimationStyledProps3.inView3
      ? css`
          animation: 0.5s ease-in-out 0.5s ${fadeIn2};
          animation-fill-mode: forwards;
        `
      : ``}

  @media ${device.mobile} {
    padding: 48px 0px 64px;
  }

  @media ${device.tablet} {
    padding: 48px 0px 64px;
  }

  @media ${device.laptop} {
    padding: 64px 0px 64px;
  }

  @media ${device.desktop} {
    padding: 64px 0px 64px;
  }
`;

const SiteImgUl = styled.ul<CarouselProps>`
  /* border: 2px solid red; */
  display: flex;
  transition: 0.5s;

  @media ${device.mobile} {
    transform: ${props => {
      if (props.selectedEl == 1) {
        return `translate3d(calc(50% - 150px), 0px, 0px)`;
      } else if (props.selectedEl == 2) {
        return `translate3d(calc(50% - 490px), 0px, 0px)`;
      } else if (props.selectedEl == 3) {
        return `translate3d(calc(50% - 830px), 0px, 0px)`;
      } else if (props.selectedEl == 4) {
        return `translate3d(calc(50% - 1170px), 0px, 0px)`;
      }
    }};
  }

  @media ${device.tablet} {
    transform: ${props => {
      if (props.selectedEl == 1) {
        return `translate3d(calc(50% - 200px), 0px, 0px)`;
      } else if (props.selectedEl == 2) {
        return `translate3d(calc(50% - 640px), 0px, 0px)`;
      } else if (props.selectedEl == 3) {
        return `translate3d(calc(50% - 1080px), 0px, 0px)`;
      } else if (props.selectedEl == 4) {
        return `translate3d(calc(50% - 1520px), 0px, 0px)`;
      }
    }};
  }

  @media ${device.laptop} {
    transform: ${props => {
      if (props.selectedEl == 1) {
        return `translate3d(calc(50% - 300px), 0px, 0px)`;
      } else if (props.selectedEl == 2) {
        return `translate3d(calc(50% - 940px), 0px, 0px)`;
      } else if (props.selectedEl == 3) {
        return `translate3d(calc(50% - 1580px), 0px, 0px)`;
      } else if (props.selectedEl == 4) {
        return `translate3d(calc(50% - 2220px), 0px, 0px)`;
      }
    }};
  }

  @media ${device.desktop} {
    // 1번 : 50% - 400px
    // 2번 : 50% - 1240px
    // 3번 : 50% - 2080px
    // 4번 : 50% - 2920px

    transform: ${props => {
      if (props.selectedEl == 1) {
        return `translate3d(calc(50% - 400px), 0px, 0px)`;
      } else if (props.selectedEl == 2) {
        return `translate3d(calc(50% - 1240px), 0px, 0px)`;
      } else if (props.selectedEl == 3) {
        return `translate3d(calc(50% - 2080px), 0px, 0px)`;
      } else if (props.selectedEl == 4) {
        return `translate3d(calc(50% - 2920px), 0px, 0px)`;
      }
    }};
  }
`;

const SiteImgEl = styled.li`
  background-color: ${props => props.theme.bgColor2};
  box-shadow: 0 0 50px 20px #cacaca42;
  margin-right: 40px;
  text-align: center;

  display: flex;

  > div:nth-child(1) {
    /* border: 1px solid red; */
    width: 40%;
  }

  > div:nth-child(2) {
    /* border: 1px solid blue; */
    width: 60%;
    display: flex;
    justify-content: center;
    align-items: end;
  }

  p {
    color: ${props => props.theme.textColor1};

    text-align: left;
    font-weight: bold;

    > span {
      color: ${props => props.theme.pointColor};
      font-weight: bold;
    }
  }

  @media ${device.mobile} {
    width: 300px;
    height: 150px;
    border-radius: 14px;
    padding: 20px;
    p {
      font-size: 8px;
      line-height: 20px;
    }

    > div:nth-child(1) {
      /* border: 1px solid red; */
      width: 55%;
    }

    > div:nth-child(2) {
      /* border: 1px solid blue; */
      width: 45%;
    }
  }

  @media ${device.tablet} {
    width: 400px;
    height: 200px;
    border-radius: 14px;
    padding: 20px;
    p {
      font-size: 8px;
      line-height: 20px;
    }
  }

  @media ${device.laptop} {
    width: 600px;
    height: 300px;
    border-radius: 22px;
    padding: 32px;
    p {
      font-size: 14px;
      line-height: 26px;
    }
  }

  @media ${device.desktop} {
    width: 800px;
    height: 400px;
    border-radius: 22px;
    padding: 32px;
    p {
      font-size: 20px;
      line-height: 32px;
    }
  }
`;

const SiteImg = styled.img`
  width: 100%;
`;

const ContentLeft = styled.div`
  /* border: 1px solid red; */
  width: 30%;
  height: 100%;
  position: relative;
`;

const TextTitle2 = styled.div<AnimationStyledProps3>`
  text-align: left;
  font-weight: bold;
  color: ${props => props.theme.textColor1};
  position: relative;
  z-index: 1;
  height: 10%;
  opacity: 0;

  ${AnimationStyledProps3 =>
    AnimationStyledProps3.inView3
      ? css`
          animation: 1s ease-in-out 0s ${fadeIn2};
          animation-fill-mode: forwards;
        `
      : ``}

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

const TextSubTitle2 = styled.div<AnimationStyledProps3>`
  text-align: left;
  color: ${props => props.theme.textColor1};
  position: relative;
  z-index: 1;
  opacity: 0;
  height: 10%;

  ${AnimationStyledProps3 =>
    AnimationStyledProps3.inView3
      ? css`
          animation: 1s ease-in-out 0s ${fadeIn2};
          animation-fill-mode: forwards;
        `
      : ``}

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

const ImgBox2 = styled.div`
  position: relative;
  width: 100%;
  height: 80%;
`;

const LandingMan1Img = styled.img`
  position: relative;
  /* z-index: 1; */
  /* bottom: 0; */
  /* left: 30px; */
  width: 300px;
`;

const LandingMan2Img = styled(LandingMan1Img)`
  left: 200px;
  width: 290px;
  bottom: 0px;
`;

const LandingCircleImg = styled.img<AnimationStyledProps3>`
  position: absolute;
  width: 380px;
  left: -40px;
  bottom: -10px;
  z-index: 0;
  opacity: 0;

  ${AnimationStyledProps3 =>
    AnimationStyledProps3.inView3
      ? css`
          animation: 1s ease-in-out 0.5s ${fadeIn2};
          animation-fill-mode: forwards;
        `
      : ``}
`;

const LandingMonitorImg = styled.img<AnimationStyledProps3>`
  position: absolute;
  z-index: 1;
  bottom: 0;
  left: 30px;
  width: 300px;

  opacity: 0;

  ${AnimationStyledProps3 =>
    AnimationStyledProps3.inView3
      ? css`
          animation: 1s ease-in-out 0.3s ${fadeIn2};
          animation-fill-mode: forwards;
        `
      : ``}
`;

const LandingBall1Img = styled(LandingMonitorImg)<AnimationStyledProps3>`
  bottom: 180px;
  left: 30px;
  width: 150px;

  opacity: 0;

  ${AnimationStyledProps3 =>
    AnimationStyledProps3.inView3
      ? css`
          animation: 1s ease-in-out 0.5s ${fadeIn2},
            1.4s infinite ease-in-out alternate ${upDown};
          animation-fill-mode: forwards;
        `
      : ``}
`;

const LandingBall2Img = styled(LandingMonitorImg)<AnimationStyledProps3>`
  bottom: 30px;
  left: 80px;
  width: 110px;

  opacity: 0;

  ${AnimationStyledProps3 =>
    AnimationStyledProps3.inView3
      ? css`
          animation: 1s ease-in-out 0.5s ${fadeIn2},
            1.2s infinite ease-in-out alternate ${upDown};
          animation-fill-mode: forwards;
        `
      : ``}
`;

const LandingBall3Img = styled(LandingMonitorImg)<AnimationStyledProps3>`
  bottom: 160px;
  left: 220px;
  width: 90px;

  opacity: 0;

  ${AnimationStyledProps3 =>
    AnimationStyledProps3.inView3
      ? css`
          animation: 1s ease-in-out 0.5s ${fadeIn2},
            1.6s infinite ease-in-out alternate ${upDown};
          animation-fill-mode: forwards;
        `
      : ``}
`;

const ContentRight = styled.div<AnimationStyledProps3>`
  /* border: 1px solid red; */
  height: 100%;
  width: 70%;
  position: relative;
  display: flex;
  flex-direction: column;

  opacity: 0;

  ${AnimationStyledProps3 =>
    AnimationStyledProps3.inView3
      ? css`
          animation: 1s ease-in-out 0.7s ${fadeIn2};
          animation-fill-mode: forwards;
        `
      : ``}
`;

const DetatilWrapper = styled.ul`
  border-top: 2px solid black;
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding: 0px;
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
  /* height: 100%; */
  width: 100%;
  overflow: hidden;
  background-color: #3a335f;
  display: flex;
  flex-direction: column;
  align-items: center;

  > div {
    &:last-child {
      background-color: #3a335f;
      position: relative;
      width: 300px;
      height: 100%;
      display: flex;
      justify-content: right;

      > div {
        background-color: #3a335f;
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

  @media ${device.mobile} {
    padding: 128px 24px;
  }

  @media ${device.tablet} {
    padding: 128px 24px;
  }

  @media ${device.laptop} {
    padding: 128px 32px;
  }

  @media ${device.desktop} {
    padding: 128px 48px;
  }
`;

const TextTitle3 = styled.div`
  text-align: center;
  font-weight: bold;
  color: ${props => props.theme.whiteColor};
  /* position: relative; */
  z-index: 1;
  width: 100%;

  > span {
    font-weight: bold;
    color: ${props => props.theme.pointColor};
  }

  @media ${device.mobile} {
    font-size: 16px;
  }

  @media ${device.tablet} {
    font-size: 24px;
  }

  @media ${device.laptop} {
    font-size: 28px;
  }

  @media ${device.desktop} {
    font-size: 32px;
    line-height: 48px;
  }
`;

const TextSubTitle3 = styled.div`
  text-align: center;
  color: #edd1ff;
  /* position: relative; */
  z-index: 1;
  text-align: center;

  @media ${device.mobile} {
    font-size: 12px;
    margin-top: 8px;
    > span {
      line-height: 24px;
    }
  }

  @media ${device.tablet} {
    font-size: 12px;
    margin-top: 8px;
    > span {
      line-height: 24px;
    }
  }

  @media ${device.laptop} {
    font-size: 12px;
    margin-top: 8px;
    > span {
      line-height: 24px;
    }
  }

  @media ${device.desktop} {
    font-size: 20px;
    margin-top: 32px;
    > span {
      line-height: 32px;
    }
  }
`;

const BigLogoImg = styled.img`
  width: 300px;
  margin-top: 80px;
  /* position: absolute; */
  /* bottom: 0; */
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

// Top Btn ====================================================
const TopBtn = styled.div`
  background-color: ${props => props.theme.pointColor};
  position: fixed;

  z-index: 999;
  border-radius: 50%;
  box-shadow: 0.208vw 0.208vw 0.208vw rgba(0, 0, 0, 0.3);
  padding: 1.042vw;
  cursor: pointer;
  transition: 0.5s;
  display: flex;
  align-items: center;
  justify-content: center;

  @media ${device.mobile} {
    right: 20px;
    bottom: 30px;
    width: 40px;
    height: 40px;
  }

  @media ${device.tablet} {
    right: 20px;
    bottom: 30px;
    width: 50px;
    height: 50px;
  }

  @media ${device.laptop} {
    right: 20px;
    bottom: 30px;
    width: 50px;
    height: 50px;
  }

  @media ${device.desktop} {
    right: 50px;
    bottom: 50px;
    width: 50px;
    height: 50px;
  }
`;

const TopImg = styled.img`
  @media ${device.mobile} {
    width: 60%;
  }

  @media ${device.tablet} {
    width: 60%;
  }

  @media ${device.laptop} {
    width: 60%;
  }

  @media ${device.desktop} {
    width: 100%;
  }
`;

const LandingPageTest = (props: Props) => {
  // 로그인 팝업창
  // const [modalOpen, setModalOpen] = useState<boolean>(false);
  const KakaoLogin = () => {
    window.location.href = 'http://j8b103.p.ssafy.io:8080/oauth/kakao';
  };

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
  const [inView3, setInView3] = useState<boolean>(false);
  const [inView4, setInView4] = useState<boolean>(false);

  // box 열기
  const [openBox, setOpenBox] = useState<boolean>(false);
  const [boxIndex, setBoxIndex] = useState<number>(0);
  const onOpenBox = (el: number) => {
    setOpenBox(!openBox);
    setBoxIndex(el);
  };

  const dispatch = useDispatch();
  const cookie = new Cookies();

  // 메인 페이지로 이동
  const navigate = useNavigate();
  const goMain = () => {
    localStorage.removeItem('accessToken');
    cookie.remove('refreshToken');
    dispatch(logout());
    navigate('/home');
  };

  // 캐러셀 이동 애니메이션
  const [selectedEl, setSelectedEl] = useState<number>(1);
  const menuClick = (el: number) => {
    setSelectedEl(el);
  };

  // top 버튼
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const ShowButtonClick = () => {
      if (window.scrollY > 700) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', ShowButtonClick);

    return () => {
      window.removeEventListener('scroll', ShowButtonClick);
    };
  }, []);

  return (
    <Wrapper>
      {/* <FullPage duration={100}> */}
      {/* {modalOpen && <LoginModal setOpenModal={setModalOpen} />} */}
      {/* <Slide> */}
      <Visual toggle={props.toggle}>
        <CircleDiv2></CircleDiv2>
        <CircleDiv></CircleDiv>

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
            <div>
              <StartBtn onClick={KakaoLogin}>카카오 로그인</StartBtn>
              <GuestBtn onClick={goMain}>게스트</GuestBtn>
            </div>
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
      {/* </Slide> */}
      {/* <Slide> */}
      <Content>
        <Box1 ref={firstBox} inView2={inView2} toggle={props.toggle}>
          <BackBox toggle={props.toggle}></BackBox>
          <TextTitle1 inView2={inView2} toggle={props.toggle}>
            <span>테드베어(TEDBEAR)</span>는?
          </TextTitle1>
          <TextSubTitle1 inView2={inView2} toggle={props.toggle}>
            <p>
              테드로 영어를 쉽게 배울 수 있는 사이트입니다.
              <br />
              테드에서 제공하는 다양한 주제의 강의로
              <br />
              회화 연습을 해보세요.
            </p>
          </TextSubTitle1>
          <DescList ref={descList}>
            <InView onChange={setInView2} triggerOnce={true}></InView>
            <DescListEl1 inView2={inView2} toggle={props.toggle}>
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
            <DescListEl2 inView2={inView2} toggle={props.toggle}>
              <LandingMicImg src={LandingMic} />
              <div>
                <ElTitle>SPEAKING</ElTitle>
                <ElDesc>
                  TED 영상과 스크립트로 <br />
                  영어 스피킹 연습을 <br />할 수 있어요.
                </ElDesc>
              </div>
            </DescListEl2>
            <DescListEl3 inView2={inView2} toggle={props.toggle}>
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
            <DescListEl4 inView2={inView2} toggle={props.toggle}>
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
        {/* </Slide> */}
        {/* <Slide> */}
        {/* <Box3 toggle={props.toggle}>
          <InView onChange={setInView3}></InView>
          <ContentLeft>
            <TextTitle2 inView3={inView3}>DETAIL</TextTitle2>
            <TextSubTitle2 inView3={inView3}>
              <p>
                TEDBEAR는 다음과 같은
                <br /> 서비스를 제공합니다.
              </p>
            </TextSubTitle2>
            <ImgBox2>
              <LandingCircleImg src={LandingCircle} inView3={inView3} />
              <LandingMonitorImg src={LandingMonitor} inView3={inView3} />
              <LandingBall1Img src={LandingBall1} inView3={inView3} />
              <LandingBall2Img src={LandingBall2} inView3={inView3} />
              <LandingBall3Img src={LandingBall3} inView3={inView3} />
            </ImgBox2>
          </ContentLeft>
          <ContentRight inView3={inView3}>
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
        </Box3> */}
        {/* </Slide> */}
        {/* <Slide> */}
        <Box3>
          <ButtonBox inView3={inView3} toggle={props.toggle}>
            <ButtonEl selectedEl={selectedEl} onClick={() => menuClick(1)}>
              비디오
            </ButtonEl>
            <ButtonEl selectedEl={selectedEl} onClick={() => menuClick(2)}>
              스피킹
            </ButtonEl>
            <ButtonEl selectedEl={selectedEl} onClick={() => menuClick(3)}>
              게임
            </ButtonEl>
            <ButtonEl selectedEl={selectedEl} onClick={() => menuClick(4)}>
              통계
            </ButtonEl>
          </ButtonBox>
          <InView onChange={setInView3} triggerOnce={true}></InView>
          <ContentBox inView3={inView3} toggle={props.toggle}>
            <SiteImgUl selectedEl={selectedEl}>
              <SiteImgEl>
                <div>
                  <p>
                    실시간으로 업데이트 되는
                    <br />
                    <span>추천 영상, 문장</span>들을 만나보세요.
                    <br />
                    <span>귀여운 곰 뱃지</span>로
                    <br />
                    난이도를 확인할 수 있어요.
                  </p>
                </div>
                <div>
                  <SiteImg src={LandingImgTemp1} />
                </div>
              </SiteImgEl>
              <SiteImgEl>
                <div>
                  <p>
                    영상과 스크립트로
                    <br />
                    <span>영어 학습</span>을 해보세요.
                    <br />
                    <span>문장을 클릭</span>하면 해당 문장의
                    <br />
                    스피킹 연습을 할 수 있어요.
                  </p>
                </div>
                <div>
                  <SiteImg src={LandingImgTemp1} />
                </div>
              </SiteImgEl>
              <SiteImgEl>
                <div>
                  <p>
                    재밌는 <span>퍼즐게임</span>과 <span>십자말풀이</span>
                    <br />
                    복습도 게임으로 재밌게 해봐요.
                  </p>
                </div>
                <div>
                  <SiteImg src={LandingImgTemp1} />
                </div>
              </SiteImgEl>
              <SiteImgEl>
                <div>
                  <p>
                    마이페이지에서 학습 상태를
                    <br />
                    <span>그래프</span>와 <span>스트릭</span>으로 만나보세요.
                    <br />
                    <span>북마크</span>에서 공부 했던 내용을
                    <br />
                    다시 볼 수 있어요.
                  </p>
                </div>
                <div>
                  <SiteImg src={LandingImgTemp1} />
                </div>
              </SiteImgEl>
            </SiteImgUl>
          </ContentBox>
        </Box3>

        <Box2 inView4={inView4}>
          {/* <LandingMovingBgDiv>
              <div></div>
            </LandingMovingBgDiv> */}
          <TextTitle3>
            TEDBEAR와 함께 <br />
            영어 공부 하실 준비가 되셨나요?
          </TextTitle3>
          <TextSubTitle3>
            <span>TEADBEAR에서 재밌게 영어 공부해서 </span>
            <span>영어 실력을 업그레이드 해보세요!</span>
          </TextSubTitle3>
          <div>
            <InView onChange={setInView4}></InView>
            <BigLogoImg src={BigLogo} />
            <div></div>
          </div>
        </Box2>
        {/* </Slide> */}
        {/* </FullPage> */}
      </Content>

      {showButton && (
        <TopBtn onClick={scrollToTop}>
          <TopImg src={Top} />
        </TopBtn>
      )}
    </Wrapper>
  );
};

export default LandingPageTest;
