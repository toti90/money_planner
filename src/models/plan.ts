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
