import { InventoryService } from "../inventory/service";
import { ProductsRepository } from "./repository";
import { ProductInsertSchema, ProductUpdateSchema } from "./types";

export class ProductsService {
  static calculateDiscount(discount: number | null, price: number) {
    return discount ? price * (discount / 100) : 0;
  }

  static async getProducts() {
    const products = await ProductsRepository.getProducts();
    return products.map(({ products, inventory, categories, discounts }) => ({
      id: products.id,
      image: products.image,
      name: products.name,
      sku: products.sku,
      description: products.description,
      price: products.price,
      category: categories.name,
      categoryId: categories.id,
      inventoryId: inventory.id,
      discountId: discounts?.id || null,
      quantity: inventory.quantity,
      discount: discounts ? discounts.percentage : 0,
      totalPrice:
        products.price -
        this.calculateDiscount(discounts?.percentage || null, products.price),
    }));
  }

  static async getProductById(productId: string) {
    const [product] = await ProductsRepository.getProductById(productId);

    if (!product) {
      return null;
    }
    const { products, inventory, categories, discounts } = product;
    return {
      id: products.id,
      image: products.image,
      name: products.name,
      sku: products.sku,
      description: products.description,
      price: products.price,
      category: categories.name,
      categoryId: categories.id,
      inventoryId: inventory.id,
      quantity: inventory.quantity,
      discount: discounts ? discounts.percentage : 0,
      totalPrice:
        products.price -
        this.calculateDiscount(discounts?.percentage || null, products.price),
    };
  }

  static async createProduct(newProduct: ProductInsertSchema) {
    const { quantity, ...product } = newProduct;
    const [inventoryCreated] = await InventoryService.createInventory({
      quantity,
    });

    product.inventoryId = inventoryCreated.id;
    const [productCreated] = await ProductsRepository.createProduct(product);
    return productCreated;
  }

  static async updateProduct(product: ProductUpdateSchema) {
    const { quantity, ...rest } = product;

    await InventoryService.updateInventory({
      quantity,
      inventoryId: product.inventoryId,
    });

    return await ProductsRepository.updateProduct(rest);
  }

  static async deleteProduct(productId: string, inventoryId: string) {
    await ProductsRepository.deleteProduct(productId);
    await InventoryService.deleteInventory(inventoryId);
  }
}
