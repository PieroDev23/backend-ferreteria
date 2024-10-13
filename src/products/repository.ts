import { eq } from "drizzle-orm";
import { categories, db, discounts, inventory, products } from "../db";
import { ProductInsertSchema, ProductUpdateSchema } from "./types";

export class ProductsRepository {
  static async createProduct(product: Omit<ProductInsertSchema, "quantity">) {
    return await db
      .insert(products)
      .values({ ...product })
      .returning();
  }

  static async getProducts() {
    return await db
      .select()
      .from(products)
      .innerJoin(categories, eq(products.categoryId, categories.id))
      .innerJoin(inventory, eq(products.inventoryId, inventory.id))
      .leftJoin(discounts, eq(products.discountId, discounts.id));
  }

  static async getProductById(productId: string) {
    return await db
      .select()
      .from(products)
      .innerJoin(categories, eq(products.categoryId, categories.id))
      .innerJoin(inventory, eq(products.inventoryId, inventory.id))
      .leftJoin(discounts, eq(products.discountId, discounts.id))
      .where(eq(products.id, productId));
  }

  static async updateProduct(product: Omit<ProductUpdateSchema, "quantity">) {
    const { id, ...fields } = product;
    return await db
      .update(products)
      .set({
        ...fields,
        updatedAt: new Date(),
      })
      .where(eq(products.id, id))
      .returning();
  }

  static async deleteProduct(productId: string) {
    // updating product
    await db
      .update(products)
      .set({
        deletedAt: new Date(),
        inventoryId: null,
      })
      .where(eq(products.id, productId))
      .returning();
  }
}
