import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import { env } from "./config/env";
import { connectToDatabase, disconnectFromDatabase } from "./db/connect";
import { healthRouter } from "./routes/health";
import { authRouter } from "./routes/auth";

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (env.NODE_ENV === "development") {
        if (/^http:\/\/localhost:\d+$/.test(origin)) {
          return callback(null, true);
        }
      }

      if (origin === env.CLIENT_ORIGIN) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

app.use("/api", healthRouter);
app.use("/api/auth", authRouter);

app.use((req, res) => {
  res
    .status(404)
    .json({ message: `Route not found: ${req.method} ${req.path}` });
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use(
  (
    err: unknown,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction,
  ) => {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  },
);

const start = async () => {
  await connectToDatabase();

  app.listen(env.PORT, () => {
    console.log(`API listening on http://localhost:${env.PORT}`);
  });
};

const shutdown = async () => {
  try {
    await disconnectFromDatabase();
  } finally {
    process.exit(0);
  }
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

start().catch((err) => {
  console.error("Failed to start server", err);
  process.exit(1);
});
