import { CustomNextApiRequest } from "@/lib/helper";
import { PrismaClient } from "@prisma/client";
import { NextApiResponse } from "next";
import crypto from "crypto";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();

export async function verifyOTP(
  req: CustomNextApiRequest,
  res: NextApiResponse
) {
  try {
    const { email, otp } = req.body;

    const otpEntry = await prisma.oTP.findFirst({ where: { email, otp } });

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
}

export async function generateOTP(
  req: CustomNextApiRequest,
  res: NextApiResponse
) {
  try {
    const { email } = req.body;
    const otp = crypto.randomInt(100000, 999999).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    await prisma.oTP.create({
      data: {
        email,
        otp,
        expiry: otpExpiry,
      },
    });

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.NEXT_PUBLIC_EMAIL_USER,
        pass: process.env.NEXT_PUBLIC_EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.NEXT_PUBLIC_EMAIL_USER,
      to: email,
      subject: "Expenses-Tracker verify you mail",
      html: `<h1>Welcome to Our Service</h1>
            <h2>OTP: ${otp}</h2>`,
    };

    await transporter.sendMail(mailOptions);

    return res.status(201).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ message: "Something went wrong", error });
  }
}
