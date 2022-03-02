import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './index';

interface GlobalState {
  isLoading: boolean;
}

const initialState: GlobalState = {
  isLoading: false,
};

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setIsLoading } = globalSlice.actions;

export const selectIsLoading = (state: RootState) => state.global.isLoading;

export default globalSlice;
