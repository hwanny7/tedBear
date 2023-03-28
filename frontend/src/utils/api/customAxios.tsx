import axios from 'axios';

const BASE_URL = 'http://j8b103.p.ssafy.io:8080';

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

authApi.interceptors.request.use(function (config: any) {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    window.location.href = '/';
    return;
  }
  config.headers.authorization = `${accessToken}`;

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
      // Unauthorized
      const refreshToken = localStorage.getItem('refreshToken');
      await axios
        .post(`${BASE_URL}/refresh`, refreshToken)
        .then(res => {
          if (res.status === 200) {
            const newAccessToken = res.headers.authorization;

            originalRequest.headers.authorization = newAccessToken;
            localStorage.setItem('accessToken', newAccessToken);

            return axios(originalRequest);
          }
        })
        .catch(err => {
          if (err.response.data.error.code === 'REFRESH_TOKEN_EXPIRED') {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            // window.location.replace = "/login";
          }
        });
    }

    return Promise.reject(error);
  },
);
