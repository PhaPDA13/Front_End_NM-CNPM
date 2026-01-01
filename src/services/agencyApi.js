import axiosClient from "./axiosClient";

const agencyApi = {
  update: (id, data) => {
    const url = `/api/agents/${id}`; 
    return axiosClient.put(url, data); 
  },
};

export default agencyApi;