import axios, { CreateAxiosDefaults } from "axios";

export const commonAxios = (config?: CreateAxiosDefaults) => {
  const axiosInstance = axios.create(config);

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};
