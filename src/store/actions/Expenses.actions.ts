import { apiConstants } from "@/lib/contants";
import { Dispatch } from "@reduxjs/toolkit";
import { NextRequest } from "next/server";
import { addExpense } from "../reducer/Expenses.reducer";

export const fetchExpenses =
  (req: NextRequest) => async (dispatch: Dispatch) => {
    const token = req.cookies.token.toString() || "";
    try {
      const response = await fetch(apiConstants.getExpenses, {
        headers: {
          Authorization: token,
        },
      });
      if (response.ok) {
        const data = await response.json();
        dispatch(addExpense(data.expenses));
      }
    } catch (error) {
      console.log(error);
    }
  };
