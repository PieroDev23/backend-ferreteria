import { ProductsRepository } from "./repository";
import { ProductUpdateSchema } from "./types";

export class ProductsService {
  static calculateDiscount(discount: number | undefined, price: number) {
    return discount ? price * (discount / 100) : price;
  }

  static async getProducts() {
    const products = await ProductsRepository.getAllProducts();
    return products.map(({ products, inventory, categories, discounts }) => ({
      id: products.id,
      name: products.name,
      sku: products.sku,
      description: products.description,
      price: products.price,
      category: categories.name,
      categoryId: categories.id,
      quantity: inventory.quantity,
      discount: discounts ? discounts.percentage : 0,
      totalPrice: this.calculateDiscount(discounts?.percentage, products.price),
    }));
  }

  static async getProductById(productId: string) {
    const [product] = await ProductsRepository.getProductById(productId);
    const { products, inventory, categories, discounts } = product;
    return {
      id: products.id,
      name: products.name,
      sku: products.sku,
      description: products.description,
      price: products.price,
      category: categories.name,
      categoryId: categories.id,
      quantity: inventory.quantity,
      discount: discounts ? discounts.percentage : 0,
      totalPrice: this.calculateDiscount(discounts?.percentage, products.price),
    };
  }

  static async updateProduct(product: ProductUpdateSchema) {
    const productUpdated = await ProductsRepository.updateProduct(product);
    return productUpdated;
  }

  // static async deleteProduct(productId: string) {
  //   const productDeleted = await ProductsRepository.deleteProduct(productId);
  //   console.log({ productDeleted });
  // }
}
