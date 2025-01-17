import axios from 'axios';
import { API_ROOT } from '../config';

export const loginWithEmailPassword = (data: any) => {
  return axios.post(`${API_ROOT}/api/v1/auth/admin`, data);
};
