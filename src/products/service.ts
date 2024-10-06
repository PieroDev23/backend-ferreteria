import { formatProduct } from "./helpers";
import { ProductsRepository } from "./repository";

export class ProductsService {
  static async getProducts() {
    const rawProducts = await ProductsRepository.getAllProducts();
    return rawProducts.map(formatProduct);
  }

  static async getProductById(productId: string) {
    const [rawProduct] = await ProductsRepository.getProductById(productId);
    return formatProduct(rawProduct);
  }
}
