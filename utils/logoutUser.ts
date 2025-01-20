import toast from "react-hot-toast";

export const logoutUser = () => {
  localStorage.clear();
  window.location.href = `/auth/login?redirect=${window.location.href}`;
  toast.error("Session expired, please login to continue");
};
