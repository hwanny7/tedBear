import PieChart from 'components/profile/PieChart';
import Exp from 'components/profile/Exp';
import HeatMap from 'components/profile/Heatmap';
import Level from 'components/profile/Level';
import Streak from 'components/profile/Streak';
import CircularStreak from 'components/profile/CircularStreak';

const YuhaPage = () => {
  return (
    <div>
      <h1>YuhaPage</h1>
      <CircularStreak></CircularStreak>
      <HeatMap></HeatMap>
      <Streak></Streak>
      <Level></Level>
      <Exp></Exp>
      <PieChart></PieChart>
    </div>
  );
};

export default YuhaPage;
