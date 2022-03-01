import { child, get, getDatabase, onValue, ref, set } from 'firebase/database';
import { Plan } from './mock/money-plan';
import { app } from './firebaseAuth';
import { Dispatch } from 'react';
import { AnyAction } from 'redux';
import { setAllPlan, setCurrentPlan } from './store/plan-slice';

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
  const dbRef = ref(getDatabase());
  let plans: Plan[] = [];
  let snapshot = await get(child(dbRef, `plan`));
  if (snapshot.exists()) {
    const values = snapshot.val();
    console.log(values);
    if (values) {
      const ids = Object.keys(values);
      for (let id of ids) {
        let plan: Plan = values[id];
        const newPlan: Plan = {
          createdDate: plan.createdDate,
          id: id,
          categories: plan.categories,
          name: plan.name,
        };
        console.log(newPlan);
        plans.push(newPlan);
      }
    }
  }
  if (plans) {
    if (plans.length > 1) {
      plans = plans.sort((a, b) => a.createdDate - b.createdDate);
    }
    console.log(needToUpdateCurrent);
    if (needToUpdateCurrent) {
      dispatch(setCurrentPlan(plans[0]));
    }
    dispatch(setAllPlan(plans));
  }
}
