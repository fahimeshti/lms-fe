import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { AUTH_TOKEN_KEY } from "./constants";

export const logoutUser = () => {
  localStorage.clear();
  Cookies.remove(AUTH_TOKEN_KEY);
  window.location.href = `/auth/login?redirect=${window.location.href}`;
  toast.error("Session expired, please login to continue");
};
