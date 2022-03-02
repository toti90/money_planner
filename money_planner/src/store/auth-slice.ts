import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from './index';

interface AuthState {
  isLoggedIn: boolean;
  email: string;
}

const initialState: AuthState = {
  isLoggedIn: localStorage.getItem('authToken') ? true : false,
  email: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = authSlice.actions;

export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;

export default authSlice;
