// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getAllCategories } from "@/server/controllers/Categories.controller";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  if (method === "GET") {
    return getAllCategories(req, res);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
