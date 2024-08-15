// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
  createExpense,
  getAllExpenses,
} from "@/server/controllers/Expense.controller";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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
