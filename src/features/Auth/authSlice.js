import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../services/axiosClient";
import { toast } from 'react-toastify'; 
import { setAccessToken } from "../../services/axiosClient";

export const userLogin = createAsyncThunk(
    'user/login',
    async (userData, thunkApi ) => {
        try{
            const response = await axiosClient.post('/login', userData)
            return response;
        }
        catch(error){
            return thunkApi.rejectWithValue(error.response.data)
        }
    }
)

export const userRegister = createAsyncThunk(
    'user/register',
    async(userData, thunkApi)=>{
        try {
            console.log(userData)
             const response = await axiosClient.post('/user/auth/register', userData);
             return response;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response?.message || "Error khi dang ky")
        }
    }
)


const initialState = {
  isLoading: false,
  accessToken: null, 
};

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        logout: (state)=>{
            state.accessToken = null
        }
    },
    extraReducers: (buider)=>{
        buider.addCase(userLogin.fulfilled, (state, action)=>{
            state.isLoading = false;
            toast.success("Đăng nhập thành công!!!")
            setAccessToken(action.payload.accessToken)
        })
        buider.addCase(userLogin.pending, (state, action)=>{
            state.isLoading = true;
        })
        buider.addCase(userLogin.rejected, (state, action)=>{
            state.isLoading = false
            toast.error("Tên tài khoản hoặc mật khẩu bị sai!!!")
        })
        buider.addCase(userRegister.pending, (state, action)=>{
            state.isLoading = true;
        })  
        buider.addCase(userRegister.fulfilled, (state, action)=>{
            state.isLoading = false;
            toast.success(action.payload.message ?? "")
        })
        buider.addCase(userRegister.rejected, (state, action)=>{
            state.isLoading = false;
            toast.error("Username or email already exist")
        })
    }
})

export default authSlice.reducer
export const {logout} = authSlice.actions