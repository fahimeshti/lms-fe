import axios from 'axios';
import { API_ROOT } from '../config';
import { getAccessToken } from '../storage';

export const getUsers = () => {
  return axios.get(`${API_ROOT}/api/v1/users`, {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
};
