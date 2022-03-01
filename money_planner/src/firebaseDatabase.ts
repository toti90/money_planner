import { getDatabase, onValue, ref, set } from 'firebase/database';
import { Plan } from './mock/money-plan';
import { app } from './firebaseAuth';
import { Dispatch } from 'react';
import { AnyAction } from 'redux';
import { setAllPlan, setCurrentPlan } from './store/plan-slice';

const database = getDatabase(app);

export function writePlan(monthylPlan: Plan): Promise<void> {
  return set(ref(database, `plan/${monthylPlan.id}`), {
    name: monthylPlan.name,
    categories: monthylPlan.categories,
  });
}

export function getPlans(dispatch: Dispatch<AnyAction>): void {
  const data = ref(database, 'plan');
  onValue(data, (snapshot) => {
    let plans: Plan[] = [];
    const values = snapshot.val();
    const ids = Object.keys(values);
    for (let id of ids) {
      let plan: Plan = values[id];
      const newPlan = {
        id: id,
        categories: plan.categories,
        name: plan.name,
      };
      plans.push(newPlan);
    }
    if (plans) {
      dispatch(setCurrentPlan(plans[0]));
      dispatch(setAllPlan(plans));
    }
  });
}
