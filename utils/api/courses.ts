import axiosInstance from "./config";

export const getCourses = (query?: string, filter: "asc" | "desc" = "desc") => {
  const params = new URLSearchParams();
  if (query) params.append("query", query);
  if (filter) params.append("filter", filter);
  return axiosInstance.get(`/courses?${params.toString()}`);
};
export const getPublicCourse = (id: string) => {
  return axiosInstance.get(`/courses/${id}`);
};
export const getPurchasedCourse = () => {
  return axiosInstance.get(`/courses/purchased`);
};

// get private course
export const getPrivateCourse = (id: string) => {
  return axiosInstance.get(`/courses/private/${id}`);
};

// purchase course
export const purchaseCourse = (id: string) => {
  return axiosInstance.post(`/courses/purchase/${id}`, {});
};

export const purchasedCourse = (id: string) => {
  return axiosInstance.get(`/courses/purchased/${id}`);
};

export const getLecture = (lectureId: string) => {
  return axiosInstance.get(`/courses/lectures/${lectureId}`);
};
