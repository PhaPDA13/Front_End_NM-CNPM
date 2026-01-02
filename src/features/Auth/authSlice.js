import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../services/axiosClient";
import { toast } from 'react-toastify'; 


export const userLogin = createAsyncThunk(
    'user/login',
    async (userData, thunkApi ) => {
        try{
            const response = await axiosClient.post('/user/login', userData)
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
             const response = await axiosClient.post('/user/', userData);
             console.log(response)
             return response;
        } catch (error) {
            console.log(error)
            return thunkApi.rejectWithValue(error.response?.data?.error?.message || "Error khi dang ky")
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
        },
        setCredentials: (state, action)=>{
            if(action.payload.accessToken){
                state.accessToken = action.payload.accessToken
            }
        }
    },
    extraReducers: (buider)=>{
        buider.addCase(userLogin.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.accessToken = action.payload.accessToken
            toast.success(action.payload.message)
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
            toast.success(action.payload.message ?? "Create successful account")
        })
        buider.addCase(userRegister.rejected, (state, action)=>{
            state.isLoading = false;
            toast.error(action.payload ?? "Error")
        })
    }
})

export default authSlice.reducer
export const {logout, setCredentials} = authSlice.actions