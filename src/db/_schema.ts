import { sql } from "drizzle-orm";
import {
  integer,
  pgSchema,
  smallint,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const ferreteriSchema = pgSchema("ferreteria");

export const categories = ferreteriSchema.table("categories", {
  id: uuid("id")
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  name: varchar("name").notNull(),
  description: varchar("description").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});

export const inventory = ferreteriSchema.table("inventory", {
  id: uuid("id")
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  quantity: integer("quantity").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});

export const discounts = ferreteriSchema.table("discounts", {
  id: uuid("id")
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  percentage: smallint("percentage").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});

export const products = ferreteriSchema.table("products", {
  id: uuid("id")
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  name: varchar("name").notNull(),
  image: varchar("image"),
  description: varchar("description").notNull(),
  price: integer("price").notNull(),
  sku: varchar("sku").notNull(),
  categoryId: uuid("category_id").references(() => categories.id),
  discountId: uuid("discount_id").references(() => discounts.id),
  inventoryId: uuid("inventory_id").references(() => inventory.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});
