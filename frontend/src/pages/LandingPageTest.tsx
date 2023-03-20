import styled from 'styled-components';
import { device } from 'utils/mediaQuery';
// visual svg
import Wave from 'assets/img/wave.svg';
import Smog from 'assets/img/landingSmog.svg';
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
  border: 1px solid black;
`;

// 상단 비주얼 /////////////////////////////////////////////////////////////////////////////////////////
const Visual = styled.div`
  background-color: ${props => props.theme.mainColor};
  width: 100%;
  display: flex;
  flex-direction: column;

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
    height: 800px;
  }
`;

// 라이트모드, 다크모드 설정 토글
const ToggleBox = styled.div`
  /* background-color: ${props => props.theme.mainColor}; */
  width: 100%;
  height: 10%;

  @media ${device.mobile} {
  }

  @media ${device.tablet} {
  }

  @media ${device.laptop} {
  }

  @media ${device.desktop} {
  }
`;

// 사이트 대문
const VisualContent = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  position: relative;

  @media ${device.mobile} {
    flex-direction: column;
  }

  @media ${device.tablet} {
    flex-direction: column;
  }

  @media ${device.laptop} {
    flex-direction: row;
  }

  @media ${device.desktop} {
    flex-direction: row;
  }
`;

// 사이트 대문 배경 물결
const WaveImg1 = styled.img<ToggleStyledProps>`
  width: 100%;
  left: 0;
  z-index: 0;
  position: absolute;
  bottom: 0;
`;

const WaveImg2 = styled(WaveImg1)`
  bottom: -10px;
`;

const WaveImg3 = styled(WaveImg1)`
  bottom: -20px;
`;

// 사이트 대문 컨텐트 - Text / Img / Button
const TextBox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;

  @media ${device.mobile} {
    width: 100%;
    height: 50%;
  }

  @media ${device.tablet} {
    width: 100%;
    height: 50%;
  }

  @media ${device.laptop} {
    width: 60%;
    height: 100%;
  }

  @media ${device.desktop} {
    width: 65%;
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
  /* border: 1px solid blue; */

  @media ${device.mobile} {
    width: 100%;
    height: 50%;
  }

  @media ${device.tablet} {
    width: 100%;
    height: 50%;
  }

  @media ${device.laptop} {
    width: 40%;
    height: 100%;
  }

  @media ${device.desktop} {
    width: 35%;
    height: 100%;
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
  background-color: green;
  min-height: 600px;
`;

const LandingPageTest = (props: Props) => {
  // 다크모드, 라이트모드 설정
  const clickedToggle = () => {
    props.setToggle(!props.toggle);
  };

  return (
    <Wrapper>
      <Visual>
        <ToggleBox></ToggleBox>
        <VisualContent>
          <WaveImg1 src={Wave} toggle={props.toggle} />
          <WaveImg2 src={Wave} toggle={props.toggle} />
          <WaveImg3 src={Wave} toggle={props.toggle} />
          <TextBox>
            <Title>
              Let&apos;s Learn with <span>TedBear</span>
            </Title>
            <SubTitle>TedBear로 영어 스피킹 연습을 해보세요!</SubTitle>
            <StartBtn>Get Started</StartBtn>
          </TextBox>
          <ImgBox></ImgBox>
        </VisualContent>
      </Visual>
      <Content></Content>
    </Wrapper>
  );
};

export default LandingPageTest;
