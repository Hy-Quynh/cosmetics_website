import axiosConfig from "../axiosConfig";

const URL = "/api/user";

export const userAPI = {
  getAllUser: async (type, sort, limit, offset, search) => {
    const response = await axiosConfig.get(
      `${URL}?type=${type}&limit=${limit}&offset=${offset}&sort=${sort}&search=${search}`
    );
    return response;
  },
  getUserInfo: async (userId) => {
    const response = await axiosConfig.get(`${URL}/${userId}`);
    return response;
  },
  deleteUser: async (userId, type) => {
    const response = await axiosConfig.delete(`${URL}/${userId}?type=${type}`);
    return response;
  },
  changeUserStatus: async (status, userId, type) => {
    const response = await axiosConfig.put(
      `${URL}/status/${userId}?type=${type}&status=${status}`
    );
    return response;
  },
  createNewUser: async (data) => {
    const response = await axiosConfig.post(`${URL}`, data);
    return response;
  },

  updateUserInfo: ({
    id,
    email,
    first_name,
    last_name,
    address,
    phone_number,
  }) => {
    return axiosConfig.put(`${URL}/${id}`, {
      email,
      first_name,
      last_name,
      address,
      phone_number,
    });
  },
};
