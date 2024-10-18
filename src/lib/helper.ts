import { NextApiRequest, NextApiResponse } from "next";
import { verifyToken } from "./jwt";
import { JwtPayload } from "jsonwebtoken";

export interface CustomNextApiRequest extends NextApiRequest {
  userId: number;
}

export const ApplyMiddleware =
  (callBack) => async (req: CustomNextApiRequest, res: NextApiResponse) => {
    try {
      const token = req.headers.authorization?.toString();

      if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const decodeUser = verifyToken(token) as JwtPayload;

      if (typeof decodeUser !== "string" && decodeUser.userId) {
        req.userId = Number(decodeUser.userId);
      } else {
        return res.status(401).json({ message: "Unauthorized" });
      }

      return callBack(req, res);
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
  };
