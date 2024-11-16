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

export const users = ferreteriaSchema.table("users", {
  id: uuid("id")
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  firstname: varchar("firstname").notNull(),
  lastname: varchar("lastname").notNull(),
  password: varchar("password").notNull(),
  phone: integer("phone"),
  email: varchar("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});

export const usersAddresses = ferreteriaSchema.table("users_addresses", {
  id: uuid("id")
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  userId: uuid("user_id").references(() => users.id),
  addressLine1: varchar("adderss_line_1").notNull(),
  addressLine2: varchar("address_line_2"),
  country: varchar("country").notNull(),
  city: varchar("city").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});

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
  categoryId: uuid("category_id")
    .references(() => categories.id)
    .notNull(),
  discountId: uuid("discount_id").references(() => discounts.id),
  inventoryId: uuid("inventory_id").references(() => inventory.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});

export const guests = ferreteriaSchema.table("guests", {
  id: uuid("id")
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  firstname: varchar("firstname").notNull(),
  lastname: varchar("lastname").notNull(),
  phone: varchar("phone"),
  address: varchar("address").notNull(),
  country: varchar("country").notNull(),
  city: varchar("city").notNull(),
  email: varchar("email"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const orders = ferreteriaSchema.table("orders", {
  id: uuid("id")
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  userId: uuid("user_id")
    .references(() => users.id)
    .default(sql`NULL`),
  addressId: uuid("address_id")
    .references(() => usersAddresses.id)
    .default(sql`NULL`),
  guestId: uuid("guest_id")
    .references(() => guests.id)
    .default(sql`NULL`),
  status: varchar("status"),
  totalAmount: varchar("total_amount").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});

export const orderItems = ferreteriaSchema.table("order_items", {
  id: uuid("id")
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  orderId: uuid("order_id")
    .references(() => orders.id)
    .notNull(),
  productId: uuid("product_id")
    .references(() => products.id)
    .notNull(),
  quantity: integer("quantity").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
