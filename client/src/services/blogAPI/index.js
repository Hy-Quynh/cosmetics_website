import axiosConfig from "../axiosConfig";

const URL = "/api/blog";
const PUBLIC_URL = "/api/public";

export const blogAPI = {
  getAllBlogList: async (limit, offset, search) => {
    const response = await axiosConfig.get(
      `${URL}?limit=${limit}&offset=${offset}&search=${search}`
    );
    return response;
  },

  getAllRelativeBlog: async (limit, offset, existBlog) => {
    const response = await axiosConfig.get(
      `${URL}/relative?limit=${limit}&offset=${offset}&existBlog=${existBlog}`
    );
    return response;
  },

  getBlogById: async (blogId) => {
    const response = await axiosConfig.get(`${URL}/${blogId}/info`);
    return response;
  },

  createNewBlog: async ({ title, desc, image }) => {
    const response = await axiosConfig.post(`${URL}`, { title, desc, image });
    return response;
  },

  deleteBlogData: async (blogId) => {
    const response = await axiosConfig.delete(`${URL}/${blogId}/info`);
    return response;
  },

  updateBlogData: async ({ id, title, desc, image }) => {
    const response = await axiosConfig.put(`${URL}/${id}/info`, {
      title,
      desc,
      image,
    });
    return response;
  },

  getReviewByBlog: async ({ blogId, limit, page }) => {
    const response = await axiosConfig.get(
      `${URL}/review/${blogId}?limit=${limit}&offset=${page}`
    );
    return response;
  },

  createBlogReview: async ({ user_id, review, blog_id }) => {
    const response = await axiosConfig.post(`${URL}/review`, {
      user_id,
      review,
      blog_id,
    });
    return response;
  },

  getAllBlogReview: async () => {
    const response = await axiosConfig.get(`${URL}/review`);
    return response;
  },

  updateReviewStatus: async (reviewId, status) => {
    const response = await axiosConfig.put(`${URL}/review/${reviewId}/status`, {
      status,
    });
    return response;
  },

  getUserFavouriteBlog: async (userId, blogId) => {
    const response = await axiosConfig.get(
      `${URL}/favourite?userId=${userId}&blogId=${blogId}`
    );
    return response;
  },

  changeUserFavouriteBlog: async (userId, blogId, status) => {
    const response = await axiosConfig.put(
      `${URL}/favourite?userId=${userId}&blogId=${blogId}`,
      { status }
    );
    return response;
  },

  changeBlogView: async (blogId, view) => {
    const response = await axiosConfig.put(`${PUBLIC_URL}/view/${blogId}`, {
      view,
    });
    return response;
  },
};
