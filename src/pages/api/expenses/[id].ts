// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getAllCategories } from "@/server/controllers/Categories.controller";
import {
  deleteExpense,
  updateExpense,
} from "@/server/controllers/Expense.controller";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  if (method === "GET") {
    return getAllCategories(req, res);
  } else if (method === "PUT") {
    return updateExpense(req, res);
  } else if (method === "DELETE") {
    return deleteExpense(req, res);
  } else {
    res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
