import CircularStreak from 'components/profile/CircularStreak'; // 스트릭
import SemiExp from 'components/profile/SemiExp'; // 경험치 & 레벨
import PieChart from 'components/profile/PieChart'; // 학습 통계 (난이도별)
import styled from 'styled-components';

const Profile = styled.div`
  .top-container {
    display: flex;
    justify-content: space-evenly;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .bottom-container {
    display: flex;
    justify-content: space-evenly;
    margin-top: 20px;
    margin-bottom: 20px;
  }
`;
const MyPageTest = () => {
  return (
    <Profile>
      <div className="whole-container">
        <div className="top-container">
          <div className="exp-container">
            <SemiExp></SemiExp>
          </div>
          <div className="pie-container">
            <PieChart></PieChart>
          </div>
        </div>
        <div className="bottom-container">
          <CircularStreak></CircularStreak>
        </div>
      </div>
    </Profile>
  );
};

export default MyPageTest;
