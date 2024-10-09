import { sql } from "drizzle-orm";
import {
  integer,
  pgSchema,
  smallint,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const ferreteriaSchema = pgSchema("ferreteria");

export const categories = ferreteriaSchema.table("categories", {
  id: uuid("id")
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  name: varchar("name").notNull(),
  description: varchar("description").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});

export const inventory = ferreteriaSchema.table("inventory", {
  id: uuid("id")
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  quantity: integer("quantity").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});

export const discounts = ferreteriaSchema.table("discounts", {
  id: uuid("id")
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  percentage: smallint("percentage").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});

export const products = ferreteriaSchema.table("products", {
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
