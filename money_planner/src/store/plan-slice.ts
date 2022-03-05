import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Plan } from '../models/plan';
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
    updateOnePlanInTheList: (state, action: PayloadAction<Plan>) => {
      state.allPlan = state.allPlan.map((x) => {
        if (x.id === action.payload.id) {
          return { ...action.payload };
        }
        return x;
      });
    },
  },
});

export const { setCurrentPlan, setAllPlan, updateOnePlanInTheList } =
  planSlice.actions;

export const selectCurrentPlan = (state: RootState) => state.plan.currentPlan;
export const selectAllPlan = (state: RootState) => state.plan.allPlan;

export default planSlice;
