import CircularStreak from 'components/profile/CircularStreak';
import Exp from 'components/profile/Exp';
import SemiExp from 'components/profile/SemiExp';
import PieChart from 'components/profile/PieChart';

const ProfilePage = () => {
  return (
    <div>
      <CircularStreak></CircularStreak>
      {/* <Exp></Exp> */}
      <SemiExp></SemiExp>
      <PieChart></PieChart>
    </div>
  );
};

export default ProfilePage;
