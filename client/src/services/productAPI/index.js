import axiosConfig from "../axiosConfig";

const URL = "/api/product";

export const productAPI = {
  getListProduct: async (
    search,
    limit,
    offset,
    category,
    minPrice,
    maxPrice
  ) => {
    return axiosConfig.get(
      `${URL}?search=${search}&limit=${limit}&offset=${offset}&category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}`
    );
  },

  getProductById: async (productId) => {
    return axiosConfig.get(`${URL}/${productId}`);
  },

  getProductQuantity: async (productId) => {
    return axiosConfig.get(`${URL}/${productId}/quantity`);
  },

  createNewProduct: async (productData) => {
    return axiosConfig.post(`${URL}`, { productData });
  },

  updateProductData: async (productData, productId) => {
    return axiosConfig.put(`${URL}/${productId}`, { productData });
  },

  deleteProductData: async (productId) => {
    return axiosConfig.delete(`${URL}/${productId}`);
  },

  getReviewByProduct: async ({ productId, limit, page }) => {
    return axiosConfig.get(
      `${URL}/review/${productId}?limit=${limit}&page=${page}`
    );
  },

  createCustomerReview: async ({ user_id, review, product_id, star }) => {
    return axiosConfig.post(`${URL}/review`, {
      user_id,
      review,
      product_id,
      star,
    });
  },

  createChildrenReview: async ({ review_id, user_id, review, author_type }) => {
    return axiosConfig.post(`${URL}/review/children`, {
      review_id,
      user_id,
      review,
      author_type,
    });
  },

  updateReviewChildrenStatus: async (childrenId, status) => {
    return axiosConfig.put(`${URL}/review/children/${childrenId}/status`, {
      status,
    });
  },

  deleteReviewChildren: async (childrenId) => {
    return axiosConfig.delete(`${URL}/review/children/${childrenId}`);
  },

  updateUserReviewChildren: async (childrenId, review) => {
    return axiosConfig.put(`${URL}/review/children/${childrenId}`, {
      review,
    });
  },

  getAllReview: async () => {
    return axiosConfig.get({
      method: "GET",
      url: `${URL}/review`,
    });
  },

  updateReviewStatus: async (reviewId, status) => {
    return axiosConfig.put(`${URL}/review/${reviewId}/status`, { status });
  },

  deleteReviewData: async (reviewId) => {
    return axiosConfig.delete(`${URL}/review/${reviewId}`);
  },

  updateUserReview: (reviewId, review) => {
    return axiosConfig.put(`${URL}/review/${reviewId}`, { review });
  },

  checkoutCart: (
    cartData,
    paymentMethod,
    totalPrice,
    userInfo,
    paymentId,
    pickUpOption,
    pickUpTime
  ) => {
    return axiosConfig.post(`${URL}/cart`, {
      cartData,
      paymentMethod,
      totalPrice,
      userInfo,
      paymentId,
      pickUpOption,
      pickUpTime,
    });
  },

  getListCheckout: (fromData, toDate, limit, offset, status) => {
    return axiosConfig.get(
      `${URL}/checkout/list?fromData=${fromData}&toDate=${toDate}&limit=${limit}&${offset}&status=${status}`
    );
  },

  deleteCheckoutProduct: (checkoutId) => {
    return axiosConfig.delete(`${URL}/checkout/${checkoutId}`);
  },

  changeCheckoutStatus: (status, checkoutId) => {
    return axiosConfig.put(`${URL}/checkout/status/${checkoutId}`, {
      status,
    });
  },

  getCheckoutById: (checkoutId) => {
    return axiosConfig.get(`${URL}/checkout/${checkoutId}`);
  },

  getCheckoutByUserId: (userId) => {
    return axiosConfig.get(`${URL}/checkout/user/${userId}`);
  },

  checkUserPurchasedProduct: (userId, productId) => {
    return axiosConfig.get(`${URL}/purchase/${productId}/${userId}`);
  },

  getSellingProduct: (limit, offset) => {
    return axiosConfig.get(
      `${URL}/selling/info?limit=${limit}&offset=${offset}`
    );
  },
};
