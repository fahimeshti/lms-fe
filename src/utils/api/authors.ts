import axios from 'axios';
import { API_ROOT } from '../config';
import { getAccessToken } from '../storage';

export const getAuthors = () => {
  return axios.get(`${API_ROOT}/api/v1/instructors`);
};
// get instructor by id
export const getAuthor = (id: string) => {
  return axios.get(`${API_ROOT}/api/v1/instructors/${id}`);
};
// update instructor by id
export const updateAuthor = (id: string, data: any) => {
  return axios.put(`${API_ROOT}/api/v1/instructors/${id}`, data, {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
};
// add instructor
export const addAuthor = (data: any) => {
  return axios.post(`${API_ROOT}/api/v1/instructors`, data, {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
};
// delete instructor by id
export const deleteAuthor = (id: string) => {
  return axios.delete(`${API_ROOT}/api/v1/instructors/${id}`, {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
};
