import axiosInstance from "./config";

export const paymentCheckoutApi = (data: any, courseId: any) => {
  return axiosInstance.post(`/payment/checkout?cId=${courseId}`, data);
};

export const paymentCallbackApi = (data: any) => {
  return axiosInstance.post(`/payment/callback`, data);
};
