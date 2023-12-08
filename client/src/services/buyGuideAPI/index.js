import axiosConfig from "../axiosConfig";

const URL = "/api/buy-guide";

export const buyGuideAPI = {
  getAllBuyGuide: async (status, limit, offset) => {
    const response = await axiosConfig.get(
      `${URL}?status=${status}&limit=${limit}&offset=${offset}`
    );
    return response;
  },
  createNewBuyGuide: async (buyGuideData) => {
    const response = await axiosConfig.post(`${URL}`, { buyGuideData });
    return response;
  },
  updatebuyGuideData: async (buyGuideData, buyGuideId) => {
    const response = await axiosConfig.put(`${URL}/${buyGuideId}`, {
      buyGuideData,
    });
    return response;
  },
  deleteBuyGuide: async (buyGuideId) => {
    const response = await axiosConfig.delete(`${URL}/${buyGuideId}`);
    return response;
  },
  changeActiveBuyGuide: async (buyGuideId) => {
    const response = await axiosConfig.put(`${URL}/active/${buyGuideId}`);
    return response;
  },
  changeInActiveBuyGuide: async (buyGuideId) => {
    const response = await axiosConfig.put(`${URL}/inactive/${buyGuideId}`);
    return response;
  },
};
