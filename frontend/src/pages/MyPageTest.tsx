import CircularStreak from 'components/profile/CircularStreak'; // 스트릭
import SemiExp from 'components/profile/SemiExp'; // 경험치 & 레벨
import PieChart from 'components/profile/PieChart'; // 학습 통계 (난이도별)
import styled, { keyframes } from 'styled-components';
import ProfileTemp from 'assets/img/profileTemp.svg';
import Cloud from 'assets/img/landingCloud.svg';
import { device } from 'utils/mediaQuery';

const upDown = keyframes`
    from{
    transform: translateY(0px);
  }
  to{
    transform: translateY(-10px);
  }
`;

// @media ${device.mobile} {
//   }

//   @media ${device.tablet} {
//   }

//   @media ${device.laptop} {
//   }

//   @media ${device.desktop} {
//   }

const Profile = styled.div`
  /* border: 3px solid blue; */
  /* width: 100%; */

  display: flex;
  align-items: center;
  padding: 24px;

  flex-direction: column;

  @media (min-width: 500px) {
  }

  @media (min-width: 900px) {
    flex-direction: row;
    height: 100%;
  }
`;

const SideBox = styled.div`
  border-radius: 16px;
  /* border: 1px solid red; */
  background: linear-gradient(
    36deg,
    #7f74bb 0%,
    #968ec2 20%,
    #f4c6b2 75%,
    #ffdbb3 100%
  );

  box-shadow: 6px 6px 20px #61616142;

  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: hidden;

  span {
    color: ${props => props.theme.textColor1};
    text-align: center;
    position: absolute;
    z-index: 1;
  }

  @media (min-width: 500px) {
    width: 100%;
    height: 200px;
    margin-bottom: 24px;

    span {
      font-size: 1rem;
      top: 15%;
      left: 20%;
    }
  }

  @media (min-width: 900px) {
    width: 20%;
    height: 95%;
    margin-right: 24px;
    margin-bottom: 0px;

    span {
      font-size: 1rem;
      top: 10%;
      left: auto;
    }
  }
`;

const CloudImg = styled.img`
  position: absolute;

  animation: 1.4s infinite 0.3s ease-in-out alternate ${upDown};

  @media (min-width: 500px) {
    display: none;
  }

  @media (min-width: 900px) {
    width: 55%;
    top: 17rem;
    left: -10%;
    display: block;
  }
`;

const CloudImg2 = styled(CloudImg)`
  animation: 1.4s infinite 0.5s ease-in-out alternate ${upDown};

  @media (min-width: 500px) {
    display: none;
  }

  @media (min-width: 900px) {
    display: block;
    width: 30%;
    top: 70%;
    left: 80%;
  }
`;

const ProfileTempImg = styled.img`
  position: absolute;

  animation: 1.4s infinite ease-in-out alternate ${upDown};

  @media (min-width: 500px) {
    /* display: none; */
    width: 280px;
    left: 50%;
    bottom: -140px;
  }

  @media (min-width: 900px) {
    width: 25rem;
    right: auto;
    bottom: -3rem;
    left: auto;
  }
`;

const EnterBtn = styled.button`
  position: absolute;
  z-index: 1;
  color: white;
  background-color: ${props => props.theme.pointColor};
  cursor: pointer;
  box-shadow: 2px 3px 6px #999999;

  &:hover {
    background-color: #e86e35;
    transition: all 0.3s;
    transform: translateY(3px);
    /* box-shadow: 0 10px 20px rgba(255, 0, 0, 0.2); */
  }

  @media (min-width: 500px) {
    top: 50%;
    left: 20%;
    font-size: 1rem;
    padding: 16px 24px;
    border-radius: 50px;
  }

  @media (min-width: 900px) {
    top: 20%;
    left: auto;
    font-size: 1rem;
    padding: 16px 24px;
    border-radius: 50px;
  }
`;

const ContentBox = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 6px 6px 20px #61616142;

  @media (min-width: 500px) {
    width: 100%;
    height: 800px;
  }

  @media (min-width: 900px) {
    width: 70%;
    height: 95%;
  }
`;

const MyPageTest = () => {
  return (
    <Profile>
      <SideBox>
        <span>
          더 많은 학습을 해서 <br /> 경험치를 올려보세요!
        </span>
        <EnterBtn> 공부하러 가기 </EnterBtn>
        <CloudImg src={Cloud} />
        <CloudImg2 src={Cloud} />
        <ProfileTempImg src={ProfileTemp} />
      </SideBox>
      <ContentBox></ContentBox>
    </Profile>
  );
};

export default MyPageTest;
