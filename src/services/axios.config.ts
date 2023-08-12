import axios from 'axios';

const apiKey = import.meta.env.VITE_APP_KARLO_API_KEY;

export const kakoApi = axios.create({
  baseURL: '/kakao',
});

kakoApi.interceptors.request.use((config) => {
  config.headers['Content-Type'] = 'application/json';
  config.headers.Authorization = `KakaoAK ${apiKey}`;
  return config;
});

kakoApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
