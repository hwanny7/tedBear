import axios from 'axios';

const BASE_URL = 'https://ted-bear.com/api';

export const authApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const basicApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

authApi.interceptors.request.use((config: any) => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    // window.location.href = '/';
    // alert('로그인 시간이 만료되었습니다.');
    return config;
  }
  config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
});

authApi.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const { config, response } = error;
    const originalRequest = config;
    if (response.status === 401) {
      console.log('access 만료!! post 보내기 전!!');
      const accessToken = localStorage.getItem('accessToken');
      await axios
        .get(`${BASE_URL}/reissue`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then(res => {
          console.log('access 다시 받기 성공!! 200 status!!');

          if (res.status === 200) {
            const newAccessToken = res.headers.authorization;
            console.log(res.headers.authorization, '새로 받은 access token');
            console.log('이게 새로 받은 access token이야: ' + newAccessToken);

            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            localStorage.setItem('accessToken', newAccessToken);

            return axios(originalRequest);
          }
        })
        .catch(err => {
          if (err.response.status === 401) {
            localStorage.removeItem('accessToken');
            alert('토큰 만료! 재로그인 해주세요.');
            window.location.href = '/';
          }
        });
    }

    return Promise.reject(error);
  },
);
