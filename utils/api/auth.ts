import axios from "axios";
import { API_ROOT } from "../constants";

export const loginWithEmailPassword = (data: any) => {
  return axios.post(`${API_ROOT}/api/v1/auth/signin`, data);
};
