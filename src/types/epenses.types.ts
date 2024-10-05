export type Expenses = Array<{
  id: string;
  title: string;
  amount: number;
  date: Date;
  created_at: Date;
  category: SingleCategoryType;
  category_id: number;
}>;

export type SingleCategoryType = {
  id: number;
  name: string;
  description: string;
  created_at: Date;
};

export type Categories = Array<SingleCategoryType>;
