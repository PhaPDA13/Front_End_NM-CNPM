import axiosClient from "./axiosClient";

const agentTypeApi = {
    create: async (data) => {
        const url = '/api/agent-types';
        return await axiosClient.post(url, data)
    },
    getAll: async () => {
        const url = '/api/agent-types'
        return await axiosClient.get(url)
    },
    getById: async (id) => {
        const url = `/api/agent-types/${id}`
        return await axiosClient.get(url)
    },
    update: async (data, id) => {
        const url = `/api/agent-types/${id}`
        return await axiosClient.put(url, data)
    },
    delete: async (id) => {
        const url = `/api/agent-types/${id}`
        return await axiosClient.delete(url)
    }
};

export default agentTypeApi;