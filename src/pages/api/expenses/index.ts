// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ApplyMiddleware, CustomNextApiRequest } from "@/lib/helper";
import {
  createExpense,
  getAllExpenses,
} from "@/server/controllers/Expense.controller";
import type { NextApiRequest, NextApiResponse } from "next";

function handler(req: CustomNextApiRequest, res: NextApiResponse) {
  const { method } = req;
  if (method === "GET") {
    return getAllExpenses(req, res);
  } else if (method === "POST") {
    return createExpense(req, res);
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}

export default ApplyMiddleware(handler);
