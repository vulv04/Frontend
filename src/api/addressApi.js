import axiosInstance from "./axiosInstance";

export const createAddress = (data) => axiosInstance.post("/addresses", data);

export const getUserAddresses = () => axiosInstance.get("/addresses");

export const getAddressById = (id) => axiosInstance.get(`/addresses/${id}`);

export const updateAddress = (id, data) =>
  axiosInstance.put(`/addresses/${id}`, data);

export const deleteAddress = (id) => axiosInstance.delete(`/addresses/${id}`);
