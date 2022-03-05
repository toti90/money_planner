import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth-slice';
import planSlice from './plan-slice';
import globalSlice from './global-slice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    plan: planSlice.reducer,
    global: globalSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
