import { createSlice } from '@reduxjs/toolkit';
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from '../../utils/localStorage';

const initialState = {
  isLoading: false,
  isSidebarOpen: false,
  user: getUserFromLocalStorage(),
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    logoutuser: (state) => {
      state.isSidebarOpen = false;
      state.user = null;
      state.error = null;
      removeUserFromLocalStorage();
    },
    registerUserRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    registerUserSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.user = payload.user;
      addUserToLocalStorage(payload.user);
    },
    registerUserFailure: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    loginUserRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginUserSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.user = payload.user;
      addUserToLocalStorage(payload.user);
    },
    loginUserFailure: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    updateuserRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    updateuserSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.user = payload.user;
      addUserToLocalStorage(payload.user);
    },
    updateuserFailure: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
  },
});

export default userSlice.reducer;
export const {
  toggleSidebar,
  logoutuser,
  registerUserRequest,
  registerUserSuccess,
  registerUserFailure,
  loginUserRequest,
  loginUserSuccess,
  loginUserFailure,
  updateuserRequest,
  updateuserSuccess,
  updateuserFailure,
} = userSlice.actions;
