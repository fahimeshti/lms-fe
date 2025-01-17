import { AUTH_TOKEN } from './config';

export const getAccessToken = () => {
  return localStorage.getItem(AUTH_TOKEN);
};
