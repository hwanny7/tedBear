import { useEffect } from 'react';
import { authApi } from 'utils/api/customAxios';

const YuhaPage = () => {
  const KakaoLogin = () => {
    window.location.href = 'http://j8b103.p.ssafy.io:8080/oauth/kakao';
  };

  useEffect(() => {
    async function fetchData() {
      await authApi
        .get(`word/bookmark/list`)
        .then(response => console.log(response.data))
        .catch(error => {
          console.log(error.data);
        });
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>YuhaPage</h1>
      <button onClick={KakaoLogin}>LOOOOOOOGIN</button>
    </div>
  );
};

export default YuhaPage;
