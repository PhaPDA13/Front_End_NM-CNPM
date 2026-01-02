import axiosClient from "./axiosClient";

const unitsApi = {
    create: async (data) => {
        const url = '/api/units';
        return await axiosClient.post(url, data)
    },
    getAll: async () => {
        const url = '/api/units'
        return await axiosClient.get(url)
    },
    getById: async (id) => {
        const url = `/api/units/${id}`
        return await axiosClient.get(url)
    },
    update: async (data, id) => {
        const url = `/api/units/${id}`
        return await axiosClient.put(url, data)
    },
    delete: async (id) => {
        const url = `/api/units/${id}`
        return await axiosClient.delete(url)
    }
};

export default unitsApi;