import { requests } from './requests';

export function getRequest(type = 'general') {
  const patterns = requests[type];
  return patterns;
}
