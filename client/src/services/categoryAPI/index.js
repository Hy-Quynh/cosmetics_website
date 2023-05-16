import axiosConfig from "../axiosConfig";

const URL = "/api/category";

export const categoryAPI = {
  getAllCategory: async (limit, offset) => {
    const response = await axiosConfig.get(
      `${URL}?limit=${limit}&offset=${offset}`
    );
    return response;
  },
  createNewCategory: async (categoryData) => {
    const response = await axiosConfig.post(`${URL}`, { categoryData });
    return response;
  },
  updateCategoryData: async (categoryData, categoryId) => {
    const response = await axiosConfig.put(`${URL}/${categoryId}`, {
      categoryData,
    });
    return response;
  },
  deleteCategory: async (categoryId) => {
    const response = await axiosConfig.delete(`${URL}/${categoryId}`);
    return response;
  },
};
