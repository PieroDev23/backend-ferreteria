import "dotenv/config";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { db, pool } from "./_db";

(async () => {
  console.log("✍️ migration started");
  await migrate(db, { migrationsFolder: "./drizzle" });
  await pool.end();
  console.log("✅ migration ended");
})();
