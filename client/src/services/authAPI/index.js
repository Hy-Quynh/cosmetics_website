import axiosConfig from "../axiosConfig";

const URL = "/api/auth";

export const authAPI = {
  refreshToken: async (data) => {
    const response = await axiosConfig.post(`${URL}/refresh-token`, data);
    return response;
  },
  login: async (data) => {
    const response = await axiosConfig.post(`${URL}/login`, data);
    return response;
  },
  signup: async (data) => {
    const response = await axiosConfig.post(`${URL}/signup`, data);
    return response;
  },
};
