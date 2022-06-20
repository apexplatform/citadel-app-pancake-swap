import axios from 'axios';
export function getAxios(url = process.env.REACT_APP_BACKEND_URL) {
  const axiosInstance = axios.create({
    baseURL: url,
    headers: {"Access-Control-Allow-Origin": "*"},
    mode:'cors'
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
