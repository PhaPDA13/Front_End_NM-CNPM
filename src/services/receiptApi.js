import axiosClient from "./axiosClient";

const receiptApi = {
    create: async (data) => {
        const url = '/api/receipts';
        return await axiosClient.post(url, data)
    },
    getAll: async () => {
        const url = '/api/receipts'
        return await axiosClient.get(url)
    },
    getById: async (id) => {
        const url = `/api/receipts/${id}`
        return await axiosClient.get(url)
    }
};

export default receiptApi;