import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

const getAllCategories = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const categories = await prisma.categories.findMany();
    // const categoriesNames = await prisma.categories.findMany({
    //   select: { name: true },
    // });
    // console.log(categoriesNames);
    res.status(200).json({ categories });
  } catch (error) {
    res.status(500).json({ error: "Error while retrieving categories" });
  }
};

export { getAllCategories };
