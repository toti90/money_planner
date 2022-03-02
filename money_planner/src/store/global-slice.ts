import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './index';

// Define a type for the slice state
interface GlobalState {
  isLoading: boolean;
}

// Define the initial state using that type
const initialState: GlobalState = {
  isLoading: false,
};

export const globalSlice = createSlice({
  name: 'global',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setIsLoading } = globalSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectIsLoading = (state: RootState) => state.global.isLoading;

export default globalSlice;
