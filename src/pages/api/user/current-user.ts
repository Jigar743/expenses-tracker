import { verifyToken } from "@/lib/jwt";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const token = req.headers.authorization?.toString();

      if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const decodeUser = verifyToken(token);

      const user = await prisma.user.findUnique({
        where: {
          id: Number((decodeUser as any).userId),
        },
        select: {
          id: true,
          name: true,
          email: true,
          isVerified: true,
        },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong", error });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
