import axiosConfig from "../axiosConfig";

const CHAT_API_ENDPOINT = "/api/chat";

const chatApi = {
  createUserChat: (userId, message) => {
    const url = CHAT_API_ENDPOINT + `/user/${userId}`;
    return axiosConfig.post(url, { message });
  },

  getAllUserHaveChat: () => {
    const url = CHAT_API_ENDPOINT + `/user`;
    return axiosConfig.get(url);
  },

  getUserChat: (userId) => {
    const url = CHAT_API_ENDPOINT + `/user/${userId}`;
    return axiosConfig.get(url);
  },

  createUserChatReply: (userId, message, owner_reply) => {
    const url = CHAT_API_ENDPOINT + `/user/reply/${userId}`;
    return axiosConfig.post(url, {message, owner_reply});
  },

  updateReadMessage: (userId) => {
    const url = CHAT_API_ENDPOINT + `/user/status/read/${userId}`;
    return axiosConfig.put(url);
  },
};
export default chatApi;
