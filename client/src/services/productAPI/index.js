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

  updateUserReview(reviewId, review) {
    return axiosConfig.put(`${URL}/review/${reviewId}`, { review });
  },
};

// export async function checkoutCart(
//   cartData,
//   paymentMethod,
//   totalPrice,
//   userInfo,
//   paymentId,
//   pickUpOption,
//   pickUpTime
// ) {
//   return request({
//     method: "POST",
//     url: `/product/cart`,
//     body: {
//       cartData,
//       paymentMethod,
//       totalPrice,
//       userInfo,
//       paymentId,
//       pickUpOption,
//       pickUpTime,
//     },
//   });
// }

// export async function getListCheckout(fromData, toDate, limit, offset, status) {
//   return request({
//     method: "GET",
//     url: `/product/checkout/list?fromData=${fromData}&toDate=${toDate}&limit=${limit}&${offset}&status=${status}`,
//   });
// }

// export async function deleteCheckoutProduct(checkoutId) {
//   return request({
//     method: "DELETE",
//     url: `/product/checkout/${checkoutId}`,
//   });
// }

// export async function changeCheckoutStatus(status, checkoutId) {
//   return request({
//     method: "PUT",
//     url: `/product/checkout/status/${checkoutId}`,
//     body: { status },
//   });
// }

// export async function getCheckoutById(checkoutId) {
//   return request({
//     method: "GET",
//     url: `/product/checkout/${checkoutId}`,
//   });
// }

// export async function getCheckoutByUserId(userId) {
//   return request({
//     method: "GET",
//     url: `/product/checkout/user/${userId}`,
//   });
// }

// export async function createNewPromo({
//   promoData,
//   discountRule,
//   listFreeProduct,
//   listPromoProduct,
// }) {
//   return request({
//     method: "POST",
//     url: `/product/promo`,
//     body: {
//       promoData,
//       discountRule,
//       listFreeProduct,
//       listPromoProduct,
//     },
//   });
// }

// export async function updatePromoData(
//   { promoData, discountRule, listFreeProduct, listPromoProduct },
//   promoId
// ) {
//   return request({
//     method: "PUT",
//     url: `/product/promo/${promoId}`,
//     body: {
//       promoData,
//       discountRule,
//       listFreeProduct,
//       listPromoProduct,
//     },
//   });
// }

// export async function getPromoList() {
//   return request({
//     method: "GET",
//     url: `/product/promo/list`,
//   });
// }

// export async function deletePromoData(promoId) {
//   return request({
//     method: "DELETE",
//     url: `/product/promo/${promoId}`,
//   });
// }

// export async function getPromoById(promoId) {
//   return request({
//     method: "GET",
//     url: `/product/promo/${promoId}`,
//   });
// }

// export async function checkUserPurchasedProduct(userId, productId) {
//   return request({
//     method: "GET",
//     url: `/product/purchase/${productId}/${userId}`,
//   });
// }

// export async function getSellingProduct(limit, offset) {
//   return request({
//     method: "GET",
//     url: `/product/selling/info?limit=${limit}&offset=${offset}`,
//   });
// }

// export async function addKeyWordSearch(search) {
//   return request({
//     method: "POST",
//     url: `/product/search/keyword`,
//     body: { search },
//   });
// }

// export async function getMostSearchProduct() {
//   return request({
//     method: "GET",
//     url: `/product/search/most`,
//   });
// }
