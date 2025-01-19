import { AUTH_TOKEN_KEY } from "./constants";

export const getAccessToken = () => {
  return localStorage.getItem(AUTH_TOKEN_KEY);
};
