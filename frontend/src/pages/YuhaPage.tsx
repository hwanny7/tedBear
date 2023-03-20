import PieChart from 'components/profile/PieChart';
import Exp from 'components/profile/Exp';
import HeatMap from 'components/profile/Heatmap';
import Level from 'components/profile/Level';
import Streak from 'components/profile/Streak';

const YuhaPage = () => {
  return (
    <div>
      <h1>YuhaPage</h1>
      <HeatMap></HeatMap>
      <Streak></Streak>
      <Level></Level>
      <Exp></Exp>
      <PieChart></PieChart>
    </div>
  );
};

export default YuhaPage;
