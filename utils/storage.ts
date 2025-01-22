import { AUTH_TOKEN_KEY } from "./constants";
import Cookies from "js-cookie";

export const getAccessToken = () => {
  return Cookies.get(AUTH_TOKEN_KEY);
};
