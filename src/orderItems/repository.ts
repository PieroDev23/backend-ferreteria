import { db, orderItems } from "../db";

export type Item = {
  productId: string;
  orderId: string;
  quantity: number;
};

export class OrderItemsRepository {
  static async createOrderItems(items: Item[]) {
    for (const item of items) {
      await db.insert(orderItems).values({ ...item });
    }
  }
}
