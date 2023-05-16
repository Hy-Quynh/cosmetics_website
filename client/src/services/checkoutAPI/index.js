import axiosConfig from "../axiosConfig";

const URL = "/api/checkout";

export const checkoutAPI = {
  getListCheckout: async (fromDate, toDate) => {
    const response = await axiosConfig.get(
      `${URL}?fromDate=${fromDate}&toDate=${toDate}`
    );
    return response;
  },
};
