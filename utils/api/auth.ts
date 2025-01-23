import axios from "axios";
import { API_ROOT } from "../constants";

const authInstance = axios.create({
  baseURL: `${API_ROOT}/api/v1`,
  timeout: 10000,
});

export const loginWithEmailPassword = (data: any) => {
  return authInstance.post(`/auth/signin`, data);
};

export const signUpWithEmailPassword = (data: any) => {
  return authInstance.post(`/auth/signup`, data);
};

export const createUserProfile = (data: any, token: string) => {
  return authInstance.post(`/auth/profile`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
