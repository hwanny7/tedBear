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
