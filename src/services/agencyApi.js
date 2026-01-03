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
  },
  get: async (id)=>{
    const url = `/api/agents/${id}`
    return await axiosClient.get(url)
  },
  getTopRevenue: async ()=>{
    const url = '/api/agents/top-revenue'
    return await axiosClient.get(url)
  },
  getProductsByAgentId: async (agentId)=>{
    const url = `/api/agents/${agentId}/products`
    return await axiosClient.get(url)
  }
};

export default agencyApi;