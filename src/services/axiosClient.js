import axios from 'axios';
import { logout, setCredentials } from '../features/Auth/authSlice';


let accessToken = null;


let store; 

export const injectStore = (_store) => {
  store = _store;
};

const axiosClient = axios.create({
  baseURL: 'http://localhost:3000/',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, 
});


axiosClient.interceptors.request.use(
  (config) => {
    if (store) {
        const token = store.getState().auth.accessToken; 
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);



axiosClient.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config;
    if (!store) return Promise.reject(error);
    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const result = await axiosClient.post('/user/refresh');
        const newAccessToken = result.accessToken;
        store.dispatch(setCredentials({ accessToken: newAccessToken }));
        axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return axiosClient(originalRequest);
      } catch (refreshError) {
        console.log("vo day")
        store.dispatch(logout());
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);


export default axiosClient;