export type Expenses = Array<{
  id: string;
  title: string;
  amount: number;
  date: Date;
  created_at: Date;
}>;

export type Categories = Array<{
  id: number;
  name: string;
  description: string;
  created_at: Date;
}>;
