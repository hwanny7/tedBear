import { useEffect, useState } from 'react';
import { authApi } from 'utils/api/customAxios';

const YuhaPage = () => {
  const KakaoLogin = () => {
    window.location.href = 'http://j8b103.p.ssafy.io:8080/oauth/kakao';
  };

  useEffect(() => {
    console.log('언마운트!');
  }, []);

  return (
    <div>
      <h1>YuhaPage</h1>
      <button onClick={KakaoLogin}>LOOOOOOOGIN</button>
    </div>
  );
};

export default YuhaPage;
