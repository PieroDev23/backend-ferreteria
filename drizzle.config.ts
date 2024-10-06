import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/_schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    host: process.env["DB_HOST"]!,
    port: Number(process.env["DB_PORT"]!),
    user: process.env["DB_USERNAME"]!,
    password: process.env["DB_PASSWORD"]!,
    database: process.env["DB_NAME"]!,
  },
});
