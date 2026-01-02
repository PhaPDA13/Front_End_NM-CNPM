import axiosClient from "./axiosClient";

const agencyApi = {
  update: async (id, data) => {
    const url = `/api/agents/${id}`; 
    return await axiosClient.put(url, data); 
  },
  create: async (data)=>{
    const url = '/api/agents/';
    return await axiosClient.post(url, data)
  },
  getAll: async ()=>{
    const url = '/api/agents'
    return await axiosClient.get(url)
  }
};

export default agencyApi;