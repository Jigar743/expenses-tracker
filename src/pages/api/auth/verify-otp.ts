import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { email, otp } = req.body;

      const otpEntry = await prisma.oTP.findFirst({ where: { email } });

      if (!otpEntry) {
        return res.status(400).json({ message: "No OTP found for this email" });
      }

      if (otpEntry.otp !== otp || new Date() > otpEntry.expiry) {
        return res.status(400).json({ message: "Invalid or expired OTP" });
      }

      await prisma.oTP.delete({ where: { id: otpEntry.id } });

      await prisma.user.update({
        where: { email },
        data: { isVerified: true },
      });

      return res.status(200).json({ message: "OTP verified successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong", error });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
