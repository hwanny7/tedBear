import styled, { keyframes } from 'styled-components';
import Smog from 'assets/img/landingSmog.svg';
import Cloud from 'assets/img/landingCloud.svg';
import Leaf1 from 'assets/img/landingLeaf1.svg';
import Leaf2 from 'assets/img/landingLeaf2.svg';
import Leaf3 from 'assets/img/landingLeaf3.svg';
import LandingBear from 'assets/img/landingBear.svg';
import GreenBall from 'assets/img/greenBall.svg';
import PinkBall from 'assets/img/pinkBall.svg';
import LoginModal from 'components/profile/LoginModal';
import BigWave1 from 'assets/img/bigWave1.svg';
import BigWave2 from 'assets/img/bigWave2.svg';
import BigWave3 from 'assets/img/bigWave3.svg';
import SmallWave1 from 'assets/img/smallWave1.svg';
import SmallWave2 from 'assets/img/smallWave2.svg';
import SmallWave3 from 'assets/img/smallWave3.svg';
import LandingImgTemp1 from 'assets/img/landingImgTemp1.svg';
import LandingImgTemp2 from 'assets/img/landingImgTemp2.svg';
import LandingImgTemp3 from 'assets/img/landingImgTemp3.svg';
import LandingImgTemp4 from 'assets/img/landingImgTemp4.svg';
import Top from 'assets/img/top.svg';
import { SetStateAction, useState, useEffect } from 'react';

// 인터페이스
interface Props {
  toggle: boolean;
  setToggle: React.Dispatch<SetStateAction<boolean>>;
}

interface ToggleStyledProps {
  toggle: boolean;
}

const Wrapper = styled.div`
  background-color: ${props => props.theme.bgColor};
`;

const HomeTextBox = styled.div`
  width: 65%;
  height: 100vh;
  /* border: 0.069vw solid red; */
  position: relative;
  z-index: 1;
`;

const HomeImgBox = styled.div`
  width: 35%;
  height: 100vh;
  /* border: 0.069vw solid red; */
  position: relative;
  z-index: 1;
`;

const Title = styled.div`
  width: 80%;
  color: white;
  /* border: 0.069vw solid red; */
  /* text-align: center; */
  position: absolute;
  z-index: 2;
  top: 12.5vw;
  left: 20%;
  font-size: 3.333vw;
  font-weight: bold;

  span {
    color: ${props => props.theme.pointLightColor};
    font-weight: bold;
  }
`;

const SubTitle = styled.div`
  width: 80%;
  color: white;
  /* border: 0.069vw solid red; */
  /* text-align: center; */
  position: absolute;
  z-index: 2;
  top: 18.056vw;
  left: 20%;
  /* font-weight: bold; */
  font-size: 1.389vw;
`;

const StartBtn = styled.button`
  background-color: ${props => props.theme.pointColor};
  color: white;
  font-size: 1.389vw;
  /* font-weight: bold; */
  padding: 1.111vw 2.222vw;
  border-radius: 3.472vw;
  text-align: center;
  position: absolute;
  z-index: 2;
  top: 24.444vw;
  left: 20%;
  cursor: pointer;
  box-shadow: 0.347vw 0.347vw 0.694vw rgba(0, 0, 0, 0.16);
`;

// styled svg
const BigWaveImg1 = styled.img<ToggleStyledProps>`
  width: 100%;
  z-index: -1;
  position: absolute;
  top: -4.861vw;
  left: 0;
  filter: ${ToggleStyledProps =>
    !ToggleStyledProps.toggle
      ? 'invert(39%) sepia(7%) saturate(4698%) hue-rotate(210deg) brightness(85%) contrast(84%)'
      : 'invert(18%) sepia(6%) saturate(4883%) hue-rotate(210deg) brightness(92%) contrast(92%)'};
`;

const BigWaveImg2 = styled(BigWaveImg1)<ToggleStyledProps>`
  z-index: -2;
  top: -3.819vw;
  filter: ${ToggleStyledProps =>
    !ToggleStyledProps.toggle
      ? 'invert(68%) sepia(27%) saturate(458%) hue-rotate(209deg) brightness(82%) contrast(85%)'
      : 'invert(48%) sepia(38%) saturate(223%) hue-rotate(210deg) brightness(88%) contrast(87%)'};
`;

const BigWaveImg3 = styled(BigWaveImg1)<ToggleStyledProps>`
  z-index: -3;
  top: -2.778vw;
  filter: ${ToggleStyledProps =>
    !ToggleStyledProps.toggle
      ? 'invert(79%) sepia(24%) saturate(187%) hue-rotate(211deg) brightness(101%) contrast(85%)'
      : 'invert(89%) sepia(5%) saturate(462%) hue-rotate(209deg) brightness(87%) contrast(83%)'};
`;

const SmallWaveImg1 = styled.img<ToggleStyledProps>`
  bottom: 0;
  width: 100%;
  z-index: -1;
  position: absolute;
  bottom: -3.472vw;
  left: 0;
  filter: ${ToggleStyledProps =>
    !ToggleStyledProps.toggle
      ? 'invert(39%) sepia(7%) saturate(4698%) hue-rotate(210deg) brightness(85%) contrast(84%)'
      : 'invert(18%) sepia(6%) saturate(4883%) hue-rotate(210deg) brightness(92%) contrast(92%)'};
`;

const SmallWaveImg2 = styled(SmallWaveImg1)<ToggleStyledProps>`
  z-index: -2;
  bottom: -2.778vw;
  filter: ${ToggleStyledProps =>
    !ToggleStyledProps.toggle
      ? 'invert(68%) sepia(27%) saturate(458%) hue-rotate(209deg) brightness(82%) contrast(85%)'
      : 'invert(48%) sepia(38%) saturate(223%) hue-rotate(210deg) brightness(88%) contrast(87%)'};
`;

const SmallWaveImg3 = styled(SmallWaveImg1)<ToggleStyledProps>`
  z-index: -3;
  bottom: -2.083vw;
  filter: ${ToggleStyledProps =>
    !ToggleStyledProps.toggle
      ? 'invert(79%) sepia(24%) saturate(187%) hue-rotate(211deg) brightness(101%) contrast(85%)'
      : 'invert(89%) sepia(5%) saturate(462%) hue-rotate(209deg) brightness(87%) contrast(83%)'};
`;

const SmogImg = styled.img`
  width: 80%;
  position: absolute;
  top: 4.167vw;
  left: 5.556vw;
  z-index: 1;
`;

const CloudImg1 = styled.img`
  width: 30%;
  position: absolute;
  top: 11.111vw;
  left: 4.167vw;
  z-index: 2;
`;

const CloudImg2 = styled(CloudImg1)`
  width: 20%;
  top: 14.444vw;
  left: 26.389vw;
  z-index: 2;
`;

const LeafImg1 = styled.img`
  width: 30%;
  position: absolute;
  top: 20.833vw;
  left: 22.917vw;
  z-index: 2;
`;

const LeafImg2 = styled(LeafImg1)`
  width: 40%;
  top: 20.833vw;
  left: 0vw;
`;

const LeafImg3 = styled(LeafImg1)`
  width: 30%;
  top: 33.333vw;
  left: 8.333vw;
  z-index: 4;
`;

const LandingBearImg = styled.img`
  width: 75%;
  position: absolute;
  z-index: 3;
  top: 10.417vw;
  left: 5.556vw;
`;

const GreenBallImg = styled.img`
  width: 15%;
  position: absolute;
  z-index: 3;
  top: 30.556vw;
  left: 13%;
`;

const PinkBallImg = styled(GreenBallImg)`
  width: 20%;
  left: 70%;
`;

// 카드 영역
const Content1 = styled.div`
  /* background-color: yellow; */
  width: 100%;
  min-height: 100vh;
  max-height: 100vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  z-index: 1;
`;

const Content2 = styled(Content1)`
  /* background-color: purple; */
`;

const Content3 = styled(Content1)`
  /* background-color: red; */
`;

const Content4 = styled(Content1)`
  /* background-color: blue; */
`;

const Content5 = styled(Content1)`
  /* background-color: orange; */
`;

// 설명 Text box =====================================================
const TextBox = styled.div`
  /* border: 1px solid black; */
  width: 50%;
  height: 100vh;
  position: relative;
`;

const TextHeadLeft = styled.div`
  /* border: 1px solid red; */
  font-size: 2.222vw;
  font-weight: bold;
  position: absolute;
  top: 13.889vw;
  left: 30%;
  color: ${props => props.theme.textColor1};

  span {
    color: ${props => props.theme.pointColor};
    font-weight: bold;
  }
`;

const TextHeadRight = styled(TextHeadLeft)`
  left: 10%;
`;

const TextConLeft = styled.div`
  /* border: 1px solid red; */
  position: absolute;
  top: 350px;
  left: 30%;
  color: ${props => props.theme.textColor2};
  font-size: 1.25vw;

  div {
    font-weight: 500;
    margin-bottom: 56px;
  }
`;

const TextConRight = styled(TextConLeft)`
  left: 10%;
`;

const ImgBox = styled.div`
  /* border: 1px solid red; */
  width: 50%;
  height: 100vh;
  position: relative;
`;

const LandingTempImgRight = styled.img`
  position: absolute;
  top: 17.361vw;
  /* left: 25%; */
  width: 34.722vw;
`;

const LandingTempImgLeft = styled(LandingTempImgRight)`
  left: 30%;
`;

// Top Btn ====================================================
const TopBtn = styled.div`
  background-color: ${props => props.theme.whiteColor};
  position: fixed;
  right: 50px;
  bottom: 50px;
  width: 50px;
  height: 50px;
  z-index: 999;
  border-radius: 50%;
  box-shadow: 0.208vw 0.208vw 0.208vw rgba(0, 0, 0, 0.3);
  padding: 1.042vw;
  cursor: pointer;
`;

const TopImg = styled.img`
  width: 100%;
`;

// 토글 버튼!!!!!!!!!
const ToggleBtnBox = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  /* border: 5px solid red; */
`;

const ToggleBtn = styled.button<ToggleStyledProps>`
  width: 3.472vw;
  height: 2.083vw;
  border-radius: 1.042vw;
  border: none;
  cursor: pointer;
  background-color: ${ToggleStyledProps =>
    !ToggleStyledProps.toggle ? 'none' : 'rgb(0, 0, 0)'};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease-in-out;
`;

const Circle = styled.div<ToggleStyledProps>`
  background-color: ${ToggleStyledProps =>
    !ToggleStyledProps.toggle ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)'};
  width: 1.389vw;
  height: 1.389vw;
  border-radius: 50%;
  position: absolute;
  z-index: 9999;
  left: 5%;
  transition: all 0.5s ease-in-out;
  ${ToggleStyledProps =>
    ToggleStyledProps.toggle &&
    `
      transform: translate(1.528vw, 0);
      transition: all 0.5s ease-in-out;
    `}
`;

const LandingPage = (props: Props) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const clickedToggle = () => {
    props.setToggle(!props.toggle);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Wrapper>
      {modalOpen && <LoginModal setOpenModal={setModalOpen} />}
      <TopBtn onClick={scrollToTop}>
        <TopImg src={Top} />
      </TopBtn>
      <Content1>
        <ToggleBtnBox>
          <ToggleBtn onClick={clickedToggle} toggle={props.toggle}>
            <Circle toggle={props.toggle} />
          </ToggleBtn>
        </ToggleBtnBox>
        <BigWaveImg1 src={BigWave1} toggle={props.toggle} />
        <BigWaveImg2 src={BigWave2} toggle={props.toggle} />
        <BigWaveImg3 src={BigWave3} toggle={props.toggle} />
        <HomeTextBox>
          <Title>
            Let&apos;s Learn with <span>TedBear</span>
          </Title>
          <SubTitle>TedBear로 영어 스피킹 연습을 해보세요!</SubTitle>
          <StartBtn onClick={() => setModalOpen(true)}>Get Started</StartBtn>
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
      <Content2>
        <TextBox>
          <TextHeadLeft>
            사용자 <span>실력 맞춤형</span> <br />
            TED 영상들을 추천해줍니다.
          </TextHeadLeft>
          <TextConLeft>
            <div>
              실시간으로 업데이트 되는 <br />
              추천 영상, 추천 문장들을 확인해보세요.
            </div>
            <div>
              귀여운 곰 뱃지로 <br />
              영상, 문장의 난이도를 체크하실 수 있어요.
            </div>
          </TextConLeft>
        </TextBox>
        <ImgBox>
          <LandingTempImgRight src={LandingImgTemp1} />
        </ImgBox>
      </Content2>
      <Content3>
        <ImgBox>
          <LandingTempImgLeft src={LandingImgTemp2} />
        </ImgBox>
        <TextBox>
          <TextHeadRight>
            Ted 영상과 스크립트로 <br />
            <span>영어 스피킹 연습</span>을 할 수 있어요.
          </TextHeadRight>
          <TextConRight>
            <div>
              영상과 함께 제공되는 스크립트로
              <br />
              영어 학습을 해보세요.
            </div>
            <div>
              문장을 클릭하면 해당 문장의
              <br />
              스피킹 연습이 가능합니다.
            </div>
            <div>
              모르는 단어는 더블 클릭해서 <br />
              뜻을 확인해보세요.
            </div>
          </TextConRight>
        </TextBox>
      </Content3>
      <Content4>
        <TextBox>
          <TextHeadLeft>
            <span>게임</span>을 통해 <br />
            단어 실력을 테스트 해보세요.
          </TextHeadLeft>
          <TextConLeft>
            <div>
              TEDBEAR만의 차별화된 게임으로 <br />
              재밌게 공부하실 수 있습니다.
            </div>
            <div>
              단어를 맞출 때마다 <br />
              퍼즐이 맞춰져요!
            </div>
          </TextConLeft>
        </TextBox>
        <ImgBox>
          <LandingTempImgRight src={LandingImgTemp3} />
        </ImgBox>
      </Content4>
      <Content5>
        <ImgBox>
          <LandingTempImgLeft src={LandingImgTemp4} />
        </ImgBox>
        <TextBox>
          <TextHeadRight>
            마이페이지에서
            <br />
            <span>학습상태</span>를 확인해보세요.
          </TextHeadRight>
          <TextConRight>
            <div>
              학습 통계와 스트릭으로 <br />
              사용자의 학습 상태를 확인할 수 있습니다.
            </div>
            <div>
              영상, 단어, 문장 북마크에서
              <br />
              공부했던 내용을 복습해보세요.
            </div>
          </TextConRight>
        </TextBox>
        <SmallWaveImg1 src={SmallWave1} toggle={props.toggle} />
        <SmallWaveImg2 src={SmallWave2} toggle={props.toggle} />
        <SmallWaveImg3 src={SmallWave3} toggle={props.toggle} />
      </Content5>
    </Wrapper>
  );
};

export default LandingPage;
