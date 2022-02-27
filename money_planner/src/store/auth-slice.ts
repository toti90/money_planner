import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from './index';

// Define a type for the slice state
interface AuthState {
  isLoggedIn: boolean;
  email: string;
}

// Define the initial state using that type
const initialState: AuthState = {
  isLoggedIn: localStorage.getItem('authToken') ? true : false,
  email: '',
};

export const authSlice = createSlice({
  name: 'auth',
  // `createSlice` will infer the state type from the `initialState` argument
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

// Other code such as selectors can use the imported `RootState` type
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;

export default authSlice;
