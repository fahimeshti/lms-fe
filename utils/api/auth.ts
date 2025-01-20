import axios from "axios";
import { API_ROOT } from "../constants";

const authInstance = axios.create({
  baseURL: `${API_ROOT}/api/v1`,
  timeout: 10000,
});

export const loginWithEmailPassword = (data: any) => {
  return authInstance.post(`/auth/signin`, data);
};
