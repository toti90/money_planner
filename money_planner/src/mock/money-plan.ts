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
      { name: 'Bills', plannedSpent: 100000, actualSpent: 10000 },
      { name: 'Car', plannedSpent: 100000, actualSpent: 80000 },
      { name: 'Food', plannedSpent: 100080, actualSpent: 70000 },
      { name: 'Hobby', plannedSpent: 100, actualSpent: 10000 },
      { name: 'Other', plannedSpent: 15000, actualSpent: 20000 },
      { name: 'Savings', plannedSpent: 150000, actualSpent: 50000 },
    ],
  },
];
