import { API_ROOT } from "../constants";
import axios from "axios";
import { getAccessToken } from "../storage";

export const getCourses = () => {
  return axios.get(`${API_ROOT}/api/v1/courses`);
};
export const getPublicCourse = (id: string) => {
  return axios.get(`${API_ROOT}/api/v1/courses/${id}`);
};
export const getPurchasedCourse = (id: string) => {
  return axios.get(`${API_ROOT}/api/v1/courses/purchased`, {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
};

// get private course
export const getPrivateCourse = (id: string) => {
  return axios.get(`${API_ROOT}/api/v1/courses/private/${id}`, {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
};

// purchase course
export const purchaseCourse = (id: string) => {
  return axios.post(
    `${API_ROOT}/api/v1/courses/purchase/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    }
  );
};

export const purchasedCourse = (id: string) => {
  return axios.get(`${API_ROOT}/api/v1/courses/purchased/${id}`, {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
};

export const getLecture = (lectureId: string) => {
  return axios.get(`${API_ROOT}/api/v1/courses/lectures/${lectureId}`, {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
};
