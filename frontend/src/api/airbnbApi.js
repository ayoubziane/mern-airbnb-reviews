import axiosInstance from "./axiosInstance";

export const getAllApi = (page = 0) => axiosInstance.get(`?page=${page}`);

export const getReviewByIdApi = (id) => axiosInstance.get(`/id/${id}`);

export const filterAirbnbsApi = (query, by = "name", page = 0) =>
  axiosInstance.get(`?${by}=${query}&page=${page}`);

export const createReviewApi = (data) => axiosInstance.post("/review", data);

export const updateReviewApi = (data) => axiosInstance.put("/review", data);

export const deleteReviewApi = (id) => axiosInstance.delete(`/review?id=${id}`);

export const getPropertyTypesApi = () => axiosInstance.get(`/property_types`);
