import { createSlice } from '@reduxjs/toolkit';
import { MOCK_MONTHLYPLANS, MonthlyPlan } from '../mock/money-plan';
import type { RootState } from './index';

interface MonthlyPlanState {
  currentMonth: MonthlyPlan;
}

const initialState: MonthlyPlanState = {
  currentMonth: MOCK_MONTHLYPLANS[0],
};

export const monthlyPlanSlice = createSlice({
  name: 'monthlyPlan',
  initialState,
  reducers: {
    nextMont: (state) => {},
    previousMonth: (state) => {},
  },
});

export const { nextMont, previousMonth } = monthlyPlanSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCurrentMonth = (state: RootState) =>
  state.monthlyPlan.currentMonth;

export default monthlyPlanSlice;
