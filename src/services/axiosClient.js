import axios from 'axios';

let accessToken = null;

export const setAccessToken = (token) => {
  accessToken = token;
};

const axiosClient = axios.create({
  baseURL: 'http://localhost:3000/user',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, 
});


axiosClient.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    return response.data; 
  },
  (error) => {
    // Xử lý lỗi chung (VD: Token hết hạn 401 thì gọi refresh token)
    return Promise.reject(error);
  }
);

export default axiosClient;