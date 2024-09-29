const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const apiConstants = {
  getCategories: `${apiUrl}/categories`,
  getExpenses: `${apiUrl}/expenses`,
  addExpense: `${apiUrl}/expenses`,
};


