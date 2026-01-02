import axiosClient from "./axiosClient";

const districtApi = {
    getAll:async ()=>{
        const url = '/api/districts';
        return await axiosClient.get(url)
    },
    create: async(data)=>{
         const url = '/api/districts';
        return await axiosClient.post(url, data)
    },
    update: async(data, id)=>{
        const url = `/api/districts/${id}`
        return await axiosClient.put(url, data)
    },
    delete: async(id)=>{
        const url = `/api/districts/${id}`
        return await axiosClient.delete(url)
    }
};

export default districtApi;