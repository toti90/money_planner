import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth-slice';
import monthlyPlanSlice from './monthlyPlan-slice';

export const store = configureStore({
  reducer: { auth: authSlice.reducer, monthlyPlan: monthlyPlanSlice.reducer },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
