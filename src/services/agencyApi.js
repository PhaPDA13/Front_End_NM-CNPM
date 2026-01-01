import axiosClient from "./axiosClient";

const agencyApi = {
  update: (id, data) => {
    const url = `/api/agents/${id}`; 
    return axiosClient.put(url, data); 
  },
  create: (data)=>{
    const url = '/api/agents/';
    return axiosClient.post(url, data)
  }
};

export default agencyApi;