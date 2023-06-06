import axiosConfig from "../axiosConfig";

const CONTACT_URL = "/api/contact";
const PUBLIC_URL = "/api/public";

export const contactAPI = {
  createNewContact: (contactData) => {
    return axiosConfig.post(`${PUBLIC_URL}/contact`, { contactData });
  },

  getListContact: () => {
    return axiosConfig.get(`${CONTACT_URL}`);
  },

  deleteContact: (contactId) => {
    return axiosConfig.delete(`${CONTACT_URL}/${contactId}`);
  },
};
