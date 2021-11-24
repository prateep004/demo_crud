import { mainAxios } from "../";

export const getVehicle = async (id) => {
    return await mainAxios.instance.get(`/vehicles/${id}`);
};

export const getVehicles = async (params) => {
  return await mainAxios.instance.get("/vehicles", { params: params });
};

export const createVihicle = async (data) => {
  return await mainAxios.instance.post("/vehicles", { data });
};

export const updateVehicle = async (id, data) => {
  return await mainAxios.instance.put(`/vehicles/${id}`, { data: data });
};

export const deleteVehicle = async (id) => {
  return await mainAxios.instance.delete(`/vehicles/${id}`);
};
