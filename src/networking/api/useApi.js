import { apies } from './apies';
import {useAxios, useAxiosUniswap } from './useAxios';

export default function useApi(type = 'general', separate = false) {
  let axiosInstance = useAxios();
  if (separate) axiosInstance = useAxiosUniswap()
  else axiosInstance = useAxios();
  let api = {};
  const patterns = apies[type];
  Object.keys(patterns).map((patternName) => {
    const request = (data) => {
      const pattern = patterns[patternName](data);
      return axiosInstance[pattern.method](pattern.url, pattern.data);
    };
    api[patternName] = request;
  });
  return api;
}
