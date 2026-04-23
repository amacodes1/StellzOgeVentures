import { Router, type Request, type Response } from "express";
import bcrypt from "bcryptjs";
import { ObjectId } from "mongodb";
import { z } from "zod";
import { getUsersCollection } from "../db/connect";
import { signAccessToken } from "../utils/jwt";
import { requireAuth, type AuthedRequest } from "../middleware/auth";

export const authRouter = Router();

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

authRouter.post("/register", async (req: Request, res: Response) => {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) {
    return res
      .status(400)
      .json({ message: "Validation error", issues: parsed.error.issues });
  }

  const { name, email, password } = parsed.data;

  const users = getUsersCollection();
  const existing = await users.findOne({ email });
  if (existing) {
    return res
      .status(409)
      .json({ message: "User with this email already exists" });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const now = new Date();
  const insert = await users.insertOne({
    name,
    email,
    passwordHash,
    role: "customer",
    createdAt: now,
    updatedAt: now,
  });

  const userId = insert.insertedId;

  const token = signAccessToken({
    userId: userId.toString(),
    role: "customer",
  });

  return res.status(201).json({
    user: {
      id: userId.toString(),
      name,
      email,
      role: "customer",
    },
    token,
  });
});

authRouter.post("/login", async (req: Request, res: Response) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res
      .status(400)
      .json({ message: "Validation error", issues: parsed.error.issues });
  }

  const { email, password } = parsed.data;

  const users = getUsersCollection();
  const user = await users.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = signAccessToken({
    userId: user._id!.toString(),
    role: user.role,
  });

  return res.json({
    user: {
      id: user._id!.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  });
});

authRouter.get(
  "/me",
  requireAuth,
  async (req: AuthedRequest, res: Response) => {
    const userId = req.auth!.userId;

    const users = getUsersCollection();
    const user = await users.findOne({ _id: new ObjectId(userId) });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({
      user: {
        id: user._id!.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  },
);
