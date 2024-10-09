import { eq } from "drizzle-orm";
import { categories, db, discounts, inventory, products } from "../db";
import { ProductUpdateSchema } from "./types";

export class ProductsRepository {
  static async getAllProducts() {
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

  static async updateProduct(product: ProductUpdateSchema) {
    const { id, ...fields } = product;
    return await db
      .update(products)
      .set({ ...fields })
      .where(eq(products.id, id));
  }

  // static async deleteProduct(productId: string) { }
}
