import axiosInstance from "../utils/axiosInstance";

export const getProfileApi = () => {
  return axiosInstance.get("/profile");
};

export const updateProfileApi = (data) => {
  return axiosInstance.put("/profile", data);
};
