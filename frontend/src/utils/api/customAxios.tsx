import axios from 'axios';
import { Cookies } from 'react-cookie';

const BASE_URL = 'http://j8b103.p.ssafy.io/api';
const cookie = new Cookies();

export const authApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // withCredentials: true
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
    alert('로그인 시간이 만료되었습니다.');
    return;
  }
  config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
});

// authApi.interceptors.response.use(
//   response => {
//     return response;
//   },
//   async error => {
//     const { config, response } = error;
//     const originalRequest = config;
//     console.log(config);
//     if (response.status === 401) {
//       // Unauthorized
//       // const refreshToken = localStorage.getItem('refreshToken');
//       const refreshToken = cookie.get('refreshToken');
//       console.log('refresh입니다', typeof refreshToken);
//       await axios
//         .post(`${BASE_URL}/refresh`, refreshToken)
//         .then(res => {
//           if (res.status === 200) {
//             const newAccessToken = res.headers.Authorization;

//             originalRequest.headers.Authorization = newAccessToken;
//             localStorage.setItem('accessToken', newAccessToken);

//             return axios(originalRequest);
//           }
//         })
//         .catch(err => {
//           if (err.response.data.error.code === 'REFRESH_TOKEN_EXPIRED') {
//             localStorage.removeItem('accessToken');
//             cookie.remove('refreshToken');
//             // localStorage.removeItem('refreshToken');
//             // window.location.replace = "/login";
//             // 리프레시 쿠키 지우기
//           }
//         });
//     }

//     return Promise.reject(error);
//   },
// );
