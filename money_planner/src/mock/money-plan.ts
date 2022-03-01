export interface MonthlyPlan {
  month: Month;
  categories: Category[];
}

export interface Month {
  name: string;
  year: number;
  month: number;
}

export interface Category {
  id: number;
  name: string;
  plannedSpent: number;
  actualSpent: number;
}

export const MOCK_MONTHLYPLANS: MonthlyPlan[] = [
  {
    month: {
      name: 'January',
      year: 2022,
      month: 1,
    },
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
