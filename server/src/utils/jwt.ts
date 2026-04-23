import jwt from "jsonwebtoken";
import { env } from "../config/env";

export type JwtPayload = {
  userId: string;
  role: "admin" | "customer";
};

export const signAccessToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });
};

export const verifyAccessToken = (token: string): JwtPayload => {
  const decoded = jwt.verify(token, env.JWT_SECRET);
  if (typeof decoded !== "object" || decoded === null) {
    throw new Error("Invalid token");
  }
  const { userId, role } = decoded as Partial<JwtPayload>;
  if (!userId || !role) {
    throw new Error("Invalid token payload");
  }
  return { userId, role };
};
