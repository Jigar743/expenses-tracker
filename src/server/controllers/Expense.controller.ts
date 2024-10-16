import { CustomNextApiRequest } from "@/lib/helper";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

const getAllExpenses = async (
  req: CustomNextApiRequest,
  res: NextApiResponse
) => {
  try {
    const expenses = await prisma.expenses.findMany({
      where: {
        user_id: req.userId,
      },
      include: {
        category: true,
      },
    });
    res.status(200).json({ expenses });
  } catch (error) {
    res.status(500).json({ error: "Error while retrieving expenses" });
  }
};

const createExpense = async (
  req: CustomNextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { amount, title, category, date } = req.body;
    const expense = await prisma.expenses.create({
      data: {
        amount,
        title,
        category_id: category,
        date,
        user_id: req.userId,
      },
    });
    res.status(201).json({ Expense: expense });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error while creating expense" });
  }
};

const updateExpense = async (req: NextApiRequest, res: NextApiResponse) => {};

const deleteExpense = async (req: NextApiRequest, res: NextApiResponse) => {};

const getExpense = async (req: NextApiRequest, res: NextApiResponse) => {};

export {
  getAllExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
  getExpense,
};
