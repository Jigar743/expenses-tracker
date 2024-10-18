import { ApplyMiddleware, CustomNextApiRequest } from "@/lib/helper";
import { generateOTP } from "@/server/controllers/OTP.controller";
import { NextApiResponse } from "next";

function handler(req: CustomNextApiRequest, res: NextApiResponse) {
  const { method } = req;
  if (method === "POST") {
    return generateOTP(req, res);
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}

export default ApplyMiddleware(handler);
