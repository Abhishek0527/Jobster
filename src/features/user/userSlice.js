import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../../utils/axios";
import { addUserToLocalStorage, removeUserFromLocalStorage, getUserFromLocalStorage } from "../../utils/localStorage";
import { loginUserThunk, registerUserThunk, updateuserThunk } from "./userThunk";


const initialState = {
    isLoading: false,
    isSidebarOpen: false,
    user: getUserFromLocalStorage(),
};


export const registerUser = createAsyncThunk(
    'user/registerUser',
    async (user, thunkAPI) => {
      return  registerUserThunk(user, thunkAPI,'/auth/register')
    }
);
export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (user, thunkAPI) => {
     return loginUserThunk(user, thunkAPI,'/auth/login')
    }
)
export const updateuser = createAsyncThunk(
    'user/updateuser',
    async (user, thunkAPI) => {
     return   updateuserThunk(user, thunkAPI,'auth/updateuser')
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.isSidebarOpen = !state.isSidebarOpen
        },
        logoutuser: (state) => {
            state.isSidebarOpen = false;
            state.user = null;
            removeUserFromLocalStorage()
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerUser.fulfilled, (state, { payload }) => {
                const { user } = payload;
                state.isLoading = false;
                state.user = user;
                addUserToLocalStorage(user);
                toast.success(`Hello There ${user.name}`);
            })
            .addCase(registerUser.rejected, (state, { payload }) => {
                state.isLoading = false;
                toast.error(payload);
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, { payload }) => {
                const { user } = payload;
                state.isLoading = false;
                state.user = user;
                addUserToLocalStorage(user);
                toast.success(`Welcome Back ${user.name}`);
            })
            .addCase(loginUser.rejected, (state, { payload }) => {
                state.isLoading = false;
                toast.error(payload);
            })
            .addCase(updateuser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateuser.fulfilled, (state, { payload }) => {
                const { user } = payload;
                state.isLoading = false;
                state.user = user;
                addUserToLocalStorage(user);
                toast.success(`User data updated for ${user.name}`);
            })
            .addCase(updateuser.rejected, (state, { payload }) => {
                state.isLoading = false;
                toast.error(payload);
            })

    }
})

export default userSlice.reducer
export const { toggleSidebar, logoutuser } = userSlice.actions