import { data } from "react-router-dom";
import axiosClient from "./axiosClient";

const reportApi = {
    getSale: async (year, month) => {
        const url = '/api/reports/sales';
        return await axiosClient.get(url, {
            params: {
                year: year,
                month: month
            }
        })
    },
    getDebt: async (year, month) => {
        const url = '/api/reports/debt';
        return await axiosClient.get(url, {
            params: {
                year: year,
                month: month
            }
        })
    },
    getAll: async (year, month) => {
        const url = '/api/reports/summary';
        return await axiosClient.get(url, {
            params: {
                year,
                month
            }
        })
    }
};

export default reportApi;