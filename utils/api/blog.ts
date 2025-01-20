import axiosInstance from "./config";

export const getAllBlogs = () => {
  return axiosInstance.get(`/blog`);
};

export const getBlog = (id: string) => {
  return axiosInstance.get(`/blog/${id}`);
};
