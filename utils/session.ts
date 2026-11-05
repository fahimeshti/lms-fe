import Cookies from "js-cookie";
import { AUTH_TOKEN_KEY, USER_PROFILE_KEY } from "./constants";

// Matches the backend session lifetime (7 days).
export const SESSION_DAYS = 7;

export const saveSession = (token: string, user: unknown) => {
  Cookies.set(AUTH_TOKEN_KEY, token, {
    expires: SESSION_DAYS,
    secure: window.location.protocol === "https:",
    sameSite: "Strict",
  });
  localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(user));
};

// Where to go after Google sign-in (survives the round trip to Google).
const REDIRECT_KEY = "_login_redirect";
export const rememberRedirect = (redirect: string | null) => {
  if (redirect) sessionStorage.setItem(REDIRECT_KEY, redirect);
  else sessionStorage.removeItem(REDIRECT_KEY);
};
export const takeRedirect = () => {
  const value = sessionStorage.getItem(REDIRECT_KEY);
  sessionStorage.removeItem(REDIRECT_KEY);
  // Only allow same-site paths.
  return value && value.startsWith("/") && !value.startsWith("//") ? value : "/";
};
