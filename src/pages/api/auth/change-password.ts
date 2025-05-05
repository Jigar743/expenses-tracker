import { ApplyMiddleware, CustomNextApiRequest } from "@/lib/helper";
import { PrismaClient } from "@prisma/client";
import { NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { hashPassword } from "@/lib/bcrypt";

const Prisma = new PrismaClient();

async function handler(req: CustomNextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      //   const { email, password } = req.body;
      //   console.log({ id: req.userId });
      //   console.log({ req });
      const currentUser = await Prisma.user.findUnique({
        where: { id: req.userId },
      });

      //   const user = await Prisma.user.findUnique({ where: { email } });
      if (!currentUser) {
        return res.status(400).json({ message: "User not found" });
      }

      const { newPassword } = req.body;
      if (!newPassword) {
        return res.status(400).json({ message: "New password is required" });
      }

      const hashedPassword = await hashPassword(newPassword);

      // Update user password in database
      await Prisma.user.update({
        where: { id: req.userId },
        data: { password: hashedPassword },
      });

      return res.status(200).json({
        message: "Password Changed Successfully!",
      });
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong", error });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default ApplyMiddleware(handler);
