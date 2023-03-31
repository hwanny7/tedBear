import axios from 'axios';
import { Cookies } from 'react-cookie';

const BASE_URL = 'https://j8b103.p.ssafy.io/api';
const cookie = new Cookies();

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
      const refreshToken = cookie.get('refreshToken');
      const accessToken = localStorage.getItem('accessToken');
      await axios
        .post(`${BASE_URL}/reissue`, {
          header: {
            Authorization: `Bearer ${accessToken}`,
            cookie: refreshToken,
          },
        })
        .then(res => {
          console.log('access 다시 받기 성공!! 200 status!!');

          if (res.status === 200) {
            const newAccessToken = res.headers.Authorization;

            originalRequest.headers.Authorization = newAccessToken;
            localStorage.setItem('accessToken', newAccessToken);

            return axios(originalRequest);
          }
        })
        .catch(err => {
          if (err.response.status === 401) {
            console.log('refresh도 만료 됐짜너!! 다시 로그인해!');

            localStorage.removeItem('accessToken');
            cookie.remove('refreshToken');
            alert('리프레시 토큰 만료! 재로그인 해주세요');
            window.location.href = '/';
          }
        });
    }

    return Promise.reject(error);
  },
);
