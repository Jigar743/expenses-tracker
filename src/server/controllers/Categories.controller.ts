import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

const getAllCategories = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const categories = await prisma.categories.findMany();
    res.status(200).json({ Categories: categories });
  } catch (error) {
    res.status(500).json({ error: "Error while retrieving categories" });
  }
};

export { getAllCategories };
