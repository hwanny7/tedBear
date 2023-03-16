import styled, { keyframes } from 'styled-components';
import Smog from 'assets/img/landingSmog.svg';
import Cloud from 'assets/img/landingCloud.svg';
import Leaf1 from 'assets/img/landingLeaf1.svg';
import Leaf2 from 'assets/img/landingLeaf2.svg';
import Leaf3 from 'assets/img/landingLeaf3.svg';
import LandingBear from 'assets/img/landingBear.svg';
import GreenBall from 'assets/img/greenBall.svg';
import PinkBall from 'assets/img/pinkBall.svg';
import { useEffect } from 'react';

const Wrapper = styled.div`
  background-color: ${props => props.theme.bgColor};
`;

const Content1 = styled.div`
  background-color: ${props => props.theme.mainColor};
  width: 100%;
  min-height: 100vh;
  max-height: 100vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
`;

const HomeTextBox = styled.div`
  width: 65%;
  height: 100vh;
  /* border: 1px solid red; */
  position: relative;
`;

const HomeImgBox = styled.div`
  width: 35%;
  height: 100vh;
  /* border: 1px solid red; */
  position: relative;
`;

const Title = styled.div`
  width: 80%;
  color: white;
  /* border: 1px solid red; */
  /* text-align: center; */
  position: absolute;
  top: 25%;
  left: 20%;
  font-size: 64px;
  font-weight: bold;

  span {
    color: ${props => props.theme.pointLightColor};
    font-weight: bold;
  }
`;

const SubTitle = styled.div`
  width: 80%;
  color: white;
  /* border: 1px solid red; */
  /* text-align: center; */
  position: absolute;
  top: 38%;
  left: 20%;
  /* font-weight: bold; */
  font-size: 20px;
`;

const StartBtn = styled.button`
  background-color: ${props => props.theme.pointColor};
  color: white;
  font-size: 20px;
  /* font-weight: bold; */
  padding: 16px 32px;
  border-radius: 50px;
  text-align: center;
  position: absolute;
  top: 48%;
  left: 20%;
  cursor: pointer;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.16);
`;

const SmogImg = styled.img`
  width: 432px;
  position: absolute;
  top: 60px;
  left: 80px;
  z-index: 0;
`;

const CloudImg1 = styled.img`
  width: 136px;
  position: absolute;
  top: 160px;
  left: 60px;
  z-index: 1;
`;

const CloudImg2 = styled(CloudImg1)`
  width: 112px;
  top: 208px;
  left: 380px;
  z-index: 1;
`;

const LeafImg1 = styled.img`
  width: 192px;
  position: absolute;
  top: 300px;
  left: 330px;
  z-index: 1;
`;

const LeafImg2 = styled(LeafImg1)`
  width: 200px;
  top: 300px;
  left: 0px;
`;

const LeafImg3 = styled(LeafImg1)`
  width: 160px;
  top: 512px;
  left: 120px;
  z-index: 3;
`;

const LandingBearImg = styled.img`
  width: 400px;
  position: absolute;
  z-index: 2;
  top: 150px;
  left: 80px;
`;

const GreenBallImg = styled.img`
  width: 80px;
  position: absolute;
  z-index: 2;
  top: 464px;
  left: 10%;
`;

const PinkBallImg = styled(GreenBallImg)`
  width: 100px;
  left: 70%;
`;

const Content2 = styled(Content1)`
  background-color: purple;
`;

const Content3 = styled(Content1)`
  background-color: red;
`;

const Content4 = styled(Content1)`
  background-color: blue;
`;

const Content5 = styled(Content1)`
  background-color: orange;
`;

const LandingPage = () => {
  return (
    <Wrapper>
      <Content1>
        <HomeTextBox>
          <Title>
            Let&apos;s Learn with <span>TedBear</span>
          </Title>
          <SubTitle>TedBear로 영어 스피킹 연습을 해보세요!</SubTitle>
          <StartBtn>Get Started</StartBtn>
        </HomeTextBox>
        <HomeImgBox>
          <SmogImg src={Smog} />
          <CloudImg1 src={Cloud} />
          <CloudImg2 src={Cloud} />
          <LeafImg1 src={Leaf1} />
          <LeafImg2 src={Leaf2} />
          <LeafImg3 src={Leaf3} />
          <LandingBearImg src={LandingBear} />
          <PinkBallImg src={PinkBall} />
          <GreenBallImg src={GreenBall} />
        </HomeImgBox>
      </Content1>
      <Content2></Content2>
      <Content3></Content3>
      <Content4></Content4>
      <Content5></Content5>
    </Wrapper>
  );
};

export default LandingPage;
