import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Plan } from '../mock/money-plan';
import type { RootState } from './index';

interface PlanState {
  currentPlan: Plan | null;
  allPlan: Plan[];
}

const initialState: PlanState = {
  currentPlan: null,
  allPlan: [],
};

export const planSlice = createSlice({
  name: 'plan',
  initialState,
  reducers: {
    setCurrentPlan: (state, action: PayloadAction<Plan>) => {
      state.currentPlan = action.payload;
    },
    setAllPlan: (state, action: PayloadAction<Plan[]>) => {
      state.allPlan = action.payload;
    },
  },
});

export const { setCurrentPlan, setAllPlan } = planSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCurrentPlan = (state: RootState) => state.plan.currentPlan;
export const selectAllPlan = (state: RootState) => state.plan.allPlan;

export default planSlice;
