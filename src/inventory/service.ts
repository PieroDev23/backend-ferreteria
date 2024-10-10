import { InventoryRepository } from "./repository";
import { InventoryInsertSchema } from "./types";

export class InventoryService {
  static async createInventory(inventory: InventoryInsertSchema) {
    return await InventoryRepository.createInventory(inventory);
  }

  static async updateInventory(inventory: {
    quantity: number;
    inventoryId: string;
  }) {
    return await InventoryRepository.updateInventory(inventory);
  }

  static async deleteInventory(inventoryId: string) {
    return await InventoryRepository.deleteInventory(inventoryId);
  }
}
