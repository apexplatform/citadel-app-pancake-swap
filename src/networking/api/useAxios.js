import axios from 'axios';
export function useAxios() {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    withCredentials: true
  });
  const responseHandler = (response) => {
    return response.data;
  };

  const errorHandler = (error) => {
    return error?.response?.data;
  };

  axiosInstance.interceptors.response.use(responseHandler, errorHandler);

  return axiosInstance;
}

export function useAxiosUniswap() {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_UNISWAP_URL,
    withCredentials: false
  });
  const responseHandler = (response) => {
    return response.data;
  };

  const errorHandler = (error) => {
    console.error(error);
    return error.response.data;
  };

  axiosInstance.interceptors.response.use(responseHandler, errorHandler);

  return axiosInstance;
}