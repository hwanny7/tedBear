import CircularStreak from 'components/profile/CircularStreak'; // 스트릭
import SemiExp from 'components/profile/SemiExp'; // 경험치 & 레벨
import PieChart from 'components/profile/PieChart'; // 학습 통계 (난이도별)
import styled, { keyframes } from 'styled-components';
import ProfileTemp from 'assets/img/profileTemp.svg';
import Cloud from 'assets/img/landingCloud.svg';
import Info from 'assets/img/info.svg';
import { device } from 'utils/mediaQuery';
import { useNavigate } from 'react-router-dom';

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
    color: #1a1a1a;
    text-align: center;
    position: absolute;
    z-index: 1;
  }

  @media (max-width: 500px) {
    width: 100%;
    height: 160px;
    margin-bottom: 24px;
    justify-content: center;

    span {
      font-size: 1rem;
      top: 15%;
      /* left: 20%; */
    }
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

  @media (max-width: 900px) {
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

  @media (max-width: 900px) {
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

  @media (max-width: 500px) {
    display: none;
  }

  @media (min-width: 500px) {
    display: block;
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

  @media (max-width: 500px) {
    top: 50%;
    font-size: 1rem;
    padding: 16px 24px;
    border-radius: 50px;
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
  background: ${props => props.theme.profileBoxColor};
  border-radius: 16px;
  box-shadow: 6px 6px 20px #61616142;
  position: relative;
  z-index: 1;

  .expbox,
  .streakbox {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* border: 1px solid red; */
    .title {
      width: 100%;
      padding: 4px 16px;
      margin-bottom: 16px;
      font-weight: bold;
      color: #1a1a1a;
      border-radius: 16px;
      background-color: ${props => props.theme.pointLigntGrdColor6};
      display: flex;
      align-items: center;
      position: relative;
    }
  }

  @media (max-width: 500px) {
    width: 100%;
    width: 100%;

    > div {
      width: 100%;
      display: flex;
      flex-direction: column;
      /* border: 1px solid red; */
      align-items: start;
    }

    .expbox {
      padding: 24px;
      width: 100%;

      .title {
        font-size: 16px;
        box-shadow: 4px 4px 4px #61616142;
      }
    }

    .streakbox {
      padding: 0px 24px 8px;
      width: 100%;

      .title {
        font-size: 16px;
        box-shadow: 4px 4px 4px #61616142;
      }
    }
  }

  @media (min-width: 500px) {
    width: 100%;

    > div {
      width: 100%;
      display: flex;
      flex-direction: column;
      /* border: 1px solid red; */
      align-items: start;
    }

    .expbox {
      padding: 24px;
      width: 100%;

      .title {
        font-size: 16px;
        box-shadow: 4px 4px 4px #61616142;
      }
    }

    .streakbox {
      padding: 0px 24px 8px;
      width: 100%;

      .title {
        font-size: 16px;
        box-shadow: 4px 4px 4px #61616142;
      }
    }
  }

  @media (min-width: 900px) {
    width: 70%;
    height: 95%;

    > div {
      width: 100%;
      display: flex;
      flex-direction: row;
      /* border: 1px solid red; */
      align-items: start;
    }

    .expbox {
      padding: 24px;
      width: 50%;

      .title {
        font-size: 24px;
        box-shadow: 4px 4px 4px #61616142;
      }
    }

    .streakbox {
      padding: 0px 24px 8px;
      width: 100%;

      .title {
        font-size: 24px;
        box-shadow: 4px 4px 4px #61616142;
      }
    }
  }
`;

const TagBox = styled.div`
  @media (max-width: 900px) {
    display: none;
  }
  @media (min-width: 900px) {
    display: block;
    width: 8%;
    height: 95%;
    position: relative;
    z-index: 0;

    .learning,
    .learned {
      position: absolute;
      left: -10px;
      height: 50px;
      display: flex;
      align-items: center;
      background-color: ${props => props.theme.mainColor};
      border-radius: 0px 24px 24px 0px;
      color: white;
      padding: 0 8px;
      box-shadow: 6px 6px 6px #61616142;
      font-size: 14px;
      cursor: pointer;
      transition: 0.5s;
      justify-content: center;

      &:hover {
        background-color: ${props => props.theme.mainDarkColor};
        transform: translateX(8px);
      }
    }

    .learning {
      top: 30px;
      width: 80px;
    }

    .learned {
      top: 100px;
      width: 90px;
    }
  }
`;

const TagBox2 = styled.div`
  @media (max-width: 900px) {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: end;
    align-items: end;
    position: relative;

    .learning,
    .learned {
      background-color: ${props => props.theme.mainColor};
      color: white;
      padding: 8px 24px;
      border-radius: 16px 16px 0px 0px;
      position: absolute;
      height: 48px;
      bottom: -10px;
      transition: 0.5s;
      box-shadow: 6px 6px 20px #61616142;
      cursor: pointer;

      &:hover {
        background-color: ${props => props.theme.mainDarkColor};
        transform: translateY(-8px);
      }
    }

    .learning {
      right: 160px;
    }

    .learned {
      right: 32px;
    }
  }
  @media (min-width: 900px) {
    display: none;
  }
`;

const InfoCard = styled.div`
  width: 240px;
  position: absolute;
  right: 25px;
  top: 25px;
  background-color: #feac55cf;
  border-radius: 16px;
  padding: 24px;
  font-size: 16px;
  opacity: 0;
  z-index: -1;
`;

const InfoImg = styled.img`
  width: 24px;
  cursor: pointer;
  position: absolute;
  right: 16px;

  &:hover ~ ${InfoCard} {
    z-index: 5;
    opacity: 1;
  }
`;

const ProfilePage = () => {
  const navigate = useNavigate();

  return (
    <Profile>
      <SideBox>
        <span>
          더 많은 학습을 통해 <br /> 경험치를 올려보세요!
        </span>
        <EnterBtn onClick={() => navigate('/home')}> 공부하러 가기 </EnterBtn>
        <CloudImg src={Cloud} />
        <CloudImg2 src={Cloud} />
        <ProfileTempImg src={ProfileTemp} />
      </SideBox>
      <TagBox2>
        <div className="learning" onClick={() => navigate('/still-learn')}>
          학습 중
        </div>
        <div className="learned" onClick={() => navigate('/completed-learn')}>
          학습 완료
        </div>
      </TagBox2>
      <ContentBox>
        <div>
          <div className="expbox">
            <span className="title"> 경험치 </span>
            <SemiExp></SemiExp>
          </div>
          <div className="expbox">
            <span className="title">
              학습 통계
              <InfoImg src={Info} />
              <InfoCard>
                지금까지 학습한 문장들의
                <br />
                난이도별 통계
              </InfoCard>
            </span>
            <PieChart></PieChart>
          </div>
        </div>
        <div>
          <div className="streakbox">
            <span className="title">스트릭</span>
            <CircularStreak></CircularStreak>
          </div>
        </div>
      </ContentBox>
      {/* pc버전 태그 */}
      <TagBox>
        <div className="learning" onClick={() => navigate('/still-learn')}>
          학습 중
        </div>
        <div className="learned" onClick={() => navigate('/completed-learn')}>
          학습 완료
        </div>
      </TagBox>
    </Profile>
  );
};

export default ProfilePage;
