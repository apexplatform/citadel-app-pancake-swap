import { apies } from './apies';
import { getAxios } from './useAxios';

export function getApi(type = 'general', url) {
  let axiosInstance = getAxios(url);
  let api = {};
  const patterns = apies[type];
  // eslint-disable-next-line
  Object.keys(patterns).map((patternName) => {
    const request = (data) => {
      const pattern = patterns[patternName](data);
      return axiosInstance[pattern.method](pattern.url, pattern.data);
    };
    api[patternName] = request;
  });
  return api;
}
