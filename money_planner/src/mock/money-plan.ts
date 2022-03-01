import { v4 as uuidv4 } from 'uuid';
import { Timestamp } from 'firebase/firestore';

export interface Plan {
  id: string;
  name: string;
  categories: Category[];
  createdDate: number;
}

export interface Category {
  name: string;
  plannedSpent: number;
  actualSpent: number;
}

export const MOCK_MONTHLYPLANS: Plan[] = [
  {
    createdDate: new Date().getTime(),
    id: uuidv4(),
    name: '2022-January',
    categories: [
      { name: 'Bills', plannedSpent: 100000, actualSpent: 10000 },
      { name: 'Car', plannedSpent: 100000, actualSpent: 80000 },
      { name: 'Food', plannedSpent: 100080, actualSpent: 70000 },
      { name: 'Hobby', plannedSpent: 100, actualSpent: 10000 },
      { name: 'Other', plannedSpent: 15000, actualSpent: 20000 },
      { name: 'Savings', plannedSpent: 150000, actualSpent: 50000 },
    ],
  },
];
