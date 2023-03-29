import HeatMap from '@uiw/react-heat-map';
import CircularStreak from 'components/profile/CircularStreak';
import Streak from 'components/profile/Streak';

const YuhaPage = () => {
  const KakaoLogin = () => {
    window.location.href = 'http://j8b103.p.ssafy.io:8080/oauth/kakao';
  };
  return (
    <div>
      <h1>YuhaPage</h1>
      <button onClick={KakaoLogin}>LOOOOOOOGIN</button>
      <HeatMap></HeatMap>
      <Streak></Streak>
      <CircularStreak></CircularStreak>
    </div>
  );
};

export default YuhaPage;
