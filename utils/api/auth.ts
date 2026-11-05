import axios from "axios";
import { API_ROOT } from "../constants";

const authInstance = axios.create({
  baseURL: `${API_ROOT}/api/v1`,
  timeout: 10000,
});

// Passwordless login: request a 6-digit code by email, then verify it.
// The same two calls handle both login and signup.
export const sendLoginCode = (data: { email: string }) => {
  return authInstance.post(`/auth/otp/send`, data);
};

export const verifyLoginCode = (data: {
  email: string;
  otp: string;
  full_name?: string;
}) => {
  return authInstance.post(`/auth/otp/verify`, data);
};

// Starts Google sign-in; the backend redirects back to /auth/verify.
export const googleLoginUrl = () =>
  `${API_ROOT}/api/v1/auth/google?app=${encodeURIComponent(window.location.origin)}`;

export const getCurrentUser = (token: string) => {
  return authInstance.get(`/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const signOut = (token: string) => {
  return authInstance.post(`/auth/signout`, null, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const createUserProfile = (data: any, token: string) => {
  return authInstance.post(`/auth/profile`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
