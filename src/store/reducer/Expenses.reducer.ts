import { Expenses } from "@/types/epenses.types";
import { createSlice } from "@reduxjs/toolkit";

type initialStateTypes = {
  expensesList: Expenses;
};

const initialState: initialStateTypes = {
  expensesList: [],
};

const expenseSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    addExpense: (state, action) => {
      state.expensesList = action.payload;
    },
  },
});

export const { addExpense } = expenseSlice.actions;

export default expenseSlice.reducer;
