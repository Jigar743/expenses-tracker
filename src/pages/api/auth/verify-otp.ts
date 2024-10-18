import { CustomNextApiRequest } from "@/lib/helper";
import { verifyOTP } from "@/server/controllers/OTP.controller";
import { NextApiResponse } from "next";

export default async function handler(
  req: CustomNextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    return verifyOTP(req, res);
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
