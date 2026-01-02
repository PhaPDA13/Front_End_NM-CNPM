import { data } from "react-router-dom";
import axiosClient from "./axiosClient";

const reportApi = {
    getSale: async (data) => {
        const url = '/api/reports/sales';
        return await axiosClient.get(url)
    },
    getDebt: async (data) => {
        const url = '/api/reports/debt';
        return await axiosClient.get(url)
    },
    getAll: async(data)=>{
        const url = '/api/reports/summary';
        return await axiosClient.get(url)
    }
};

export default reportApi;