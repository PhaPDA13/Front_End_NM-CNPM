import axiosClient from "./axiosClient";

const billApi = {
  create: async (data)=>{
    const url = '/api/export-bills';
    return await axiosClient.post(url, data)
  },
  getAll: async()=>{
    const url = '/api/export-bills'
    return await axiosClient.get(url)
  },
  getById: async (id)=>{
    const url = `/api/export-bills/${id}`
    return await axiosClient.get(url)
  }
};

export default billApi;