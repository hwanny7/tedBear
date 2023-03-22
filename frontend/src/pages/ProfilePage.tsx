import CircularStreak from 'components/profile/CircularStreak';
import SemiExp from 'components/profile/SemiExp';
import PieChart from 'components/profile/PieChart';
import styled from 'styled-components';

const Profile = styled.div`
  .exp-container {
    /* background-color: orange; */
    display: flex;
    align-content: center;
    margin-top: 45px;
    margin-bottom: 20px;
  }
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
const ProfilePage = () => {
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

export default ProfilePage;
