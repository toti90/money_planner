import { child, get, getDatabase, ref, set } from 'firebase/database';
import { Plan } from './models/plan';
import { app } from './firebaseAuth';
import { Dispatch } from 'react';
import { AnyAction } from 'redux';
import {
  setAllPlan,
  setCurrentPlan,
  updateOnePlanInTheList,
} from './store/plan-slice';
import { setIsLoading } from './store/global-slice';

const database = getDatabase(app);

export function writePlan(plan: Plan): Promise<void> {
  return set(ref(database, `plan/${plan.id}`), {
    createdDate: plan.createdDate,
    name: plan.name,
    categories: plan.categories,
  });
}

export async function getPlans(
  dispatch: Dispatch<AnyAction>,
  needToUpdateCurrent: boolean = true
): Promise<void> {
  dispatch(setIsLoading(true));
  const dbRef = ref(getDatabase());
  let plans: Plan[] = [];
  let snapshot = await get(child(dbRef, `plan`));
  if (snapshot.exists()) {
    const values = snapshot.val();
    if (values) {
      const ids = Object.keys(values);
      for (let id of ids) {
        plans.push({ ...values[id], id });
      }
    }
  }
  if (plans) {
    if (plans.length > 1) {
      plans = plans.sort((a, b) => a.createdDate - b.createdDate);
    }

    if (needToUpdateCurrent) {
      dispatch(setCurrentPlan(plans[0]));
    }
    dispatch(setAllPlan(plans));
    dispatch(setIsLoading(false));
  }
}

export async function getPlanById(
  dispatch: Dispatch<AnyAction>,
  id: string
): Promise<void> {
  dispatch(setIsLoading(true));
  const dbRef = ref(getDatabase());
  let snapshot = await get(child(dbRef, `plan/${id}`));
  if (snapshot.exists()) {
    const value = snapshot.val();
    if (value) {
      let plan: Plan = { ...value, id };
      dispatch(setCurrentPlan(plan));
      dispatch(updateOnePlanInTheList(plan));
      dispatch(setIsLoading(false));
    }
  }
}
