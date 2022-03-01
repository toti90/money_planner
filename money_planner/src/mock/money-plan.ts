import { v4 as uuidv4 } from 'uuid';

export interface Plan {
  id: string;
  name: string;
  categories: Category[];
}

export interface Category {
  id: number;
  name: string;
  plannedSpent: number;
  actualSpent: number;
}

export const MOCK_MONTHLYPLANS: Plan[] = [
  {
    id: uuidv4(),
    name: '2022-January',
    categories: [
      { id: 1, name: 'Bills', plannedSpent: 100000, actualSpent: 10000 },
      { id: 2, name: 'Car', plannedSpent: 100000, actualSpent: 80000 },
      { id: 3, name: 'Food', plannedSpent: 100080, actualSpent: 70000 },
      { id: 4, name: 'Hobby', plannedSpent: 100, actualSpent: 10000 },
      { id: 5, name: 'Other', plannedSpent: 15000, actualSpent: 20000 },
      { id: 6, name: 'Savings', plannedSpent: 150000, actualSpent: 50000 },
    ],
  },
];
