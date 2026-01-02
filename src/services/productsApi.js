import axiosClient from "./axiosClient";

const productsApi = {
  create: async (data)=>{
    const url = '/api/products';
    return await axiosClient.post(url, data)
  },
  getAll: async()=>{
    const url = '/api/products'
    return await axiosClient.get(url)
  },
  getById: async (id)=>{
    const url = `/api/products/${id}`
    return await axiosClient.get(url)
  }
};

export default productsApi;