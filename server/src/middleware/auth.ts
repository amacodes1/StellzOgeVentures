import type { Request, Response, NextFunction } from "express";
import { verifyAccessToken, type JwtPayload } from "../utils/jwt";

export type AuthedRequest = Request & { auth?: JwtPayload };

export const requireAuth = (
  req: AuthedRequest,
  res: Response,
  next: NextFunction,
) => {
  const header = req.header("authorization") ?? req.header("Authorization");
  if (!header) {
    return res.status(401).json({ message: "Missing Authorization header" });
  }

  const [scheme, token] = header.split(" ");
  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ message: "Invalid Authorization header" });
  }

  try {
    req.auth = verifyAccessToken(token);
    return next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
