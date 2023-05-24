import axios from "axios";
import { parse, stringify } from "qs";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, USER_INFO_KEY } from "../utils/contants";
import { authAPI } from "./authAPI";

const defaultHeader = {
  "Content-Type": "application/json",
};
const axiosConfig = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: defaultHeader,
  paramsSerializer: {
    encode: parse,
    serialize: stringify,
  },
});

axiosConfig.interceptors.request.use(async (config) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);

  if (!!accessToken) {
    config.headers[`auth-token`] = `${accessToken}`;
  }

  return config;
});

axiosConfig.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }

    return response;
  },
  async (error) => {
    const { response, config } = error;
    const statusCode = response?.status;
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
    if (statusCode === 401) {
      try {
        const res = await authAPI.refreshToken({ refreshToken });
        localStorage.setItem(ACCESS_TOKEN_KEY, res?.payload);
        return axiosConfig(config);
      } catch (error) {
        if (error === "Wrong RefreshToken") {
          localStorage.removeItem(USER_INFO_KEY);
          localStorage.removeItem(ACCESS_TOKEN_KEY);
          localStorage.removeItem(REFRESH_TOKEN_KEY);
          window.alert("Phiên làm việc hết hạn. Vui lòng đăng nhập lại!");
          window.location = "/login";
        }
      }
    } else {
      throw response?.data;
      // toast.error(response?.data?.message || 'Xử lí tác vụ thất bại');
    }

    throw error?.response?.data;
  }
);
export { defaultHeader };
export default axiosConfig;
