import axios from 'axios';
import { API_ROOT } from '../config';
import { getAccessToken } from '../storage';

export const getCourses = () => {
  return axios.get(`${API_ROOT}/api/v1/courses`);
};

export const getCourse = (id: string) => {
  return axios.get(`${API_ROOT}/api/v1/courses/private/${id}`);
};

export const addCourse = (data: any) => {
  return axios.post(`${API_ROOT}/api/v1/courses`, data, {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
};

export const updateCourse = (id: string, data: any) => {
  return axios.put(`${API_ROOT}/api/v1/courses/${id}`, data, {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
};

export const deleteCourse = (id: string) => {
  return axios.delete(`${API_ROOT}/api/v1/courses/${id}`, {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
};

export const addChapters = (id: string, data: any) => {
  return axios.post(`${API_ROOT}/api/v1/courses/${id}/chapters`, data, {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
};

export const updateChapters = (id: string, data: any) => {
  return axios.put(`${API_ROOT}/api/v1/courses/${id}/chapters`, data, {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
};
