import {
  MongoClient,
  ServerApiVersion,
  ObjectId,
  type Db,
  type Collection,
} from "mongodb";
import { env } from "../config/env";

export type DbUser = {
  _id?: ObjectId;
  name: string;
  email: string;
  passwordHash: string;
  role: "admin" | "customer";
  createdAt: Date;
  updatedAt: Date;
};

let client: MongoClient | null = null;
let db: Db | null = null;

const getClient = (): MongoClient => {
  if (client) return client;

  client = new MongoClient(env.MONGODB_URI, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  return client;
};

export const connectToDatabase = async (): Promise<void> => {
  const mongoClient = getClient();
  await mongoClient.connect();

  // Uses the database name from the URI path (recommended).
  db = mongoClient.db();

  // Ensure indexes
  await db
    .collection<DbUser>("users")
    .createIndex({ email: 1 }, { unique: true });
};

export const getDb = (): Db => {
  if (!db)
    throw new Error(
      "Database not initialized. Call connectToDatabase() first.",
    );
  return db;
};

export const getUsersCollection = (): Collection<DbUser> => {
  return getDb().collection<DbUser>("users");
};

export const disconnectFromDatabase = async (): Promise<void> => {
  if (client) {
    await client.close();
    client = null;
    db = null;
  }
};
