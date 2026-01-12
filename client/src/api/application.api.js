import axiosInstance from "../utils/axiosInstance";

export const getApplicationStats = async () => {
  const res = await axiosInstance.get("/application/stats");
  return res.data;
};

// GET all applications
export const getApplicationsApi = () =>
  axiosInstance.get("/application");

// CREATE application
export const createApplicationApi = (data) =>
  axiosInstance.post("/application", data);

// UPDATE application
export const updateApplicationApi = (id, data) =>
  axiosInstance.put(`/application/${id}`, data);

// DELETE application
export const deleteApplicationApi = (id) =>
  axiosInstance.delete(`/application/${id}`);
