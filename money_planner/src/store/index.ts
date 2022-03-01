import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth-slice';
import planSlice from './plan-slice';

export const store = configureStore({
  reducer: { auth: authSlice.reducer, plan: planSlice.reducer },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
