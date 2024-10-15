import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";

export const pool = new Pool({
  host: process.env["DB_HOST"],
  port: Number(process.env["DB_PORT"]),
  user: process.env["DB_USERNAME"],
  password: process.env["DB_PASSWORD"],
  database: process.env["DB_NAME"],
  ssl: {
    rejectUnauthorized: false,
    requestCert: false,
  },
});

export const db = drizzle(pool, { logger: false });
