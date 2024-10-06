import { ProductsRepository } from "./repository";

export class ProductsService {
  static async getProducts() {
    const rawProducts = await ProductsRepository.getAllProducts();

    return rawProducts.map(({ products, inventory, discounts, categories }) => {
      const { id, name, description, sku, price, image, createdAt, updatedAt } =
        products;
      const { quantity } = inventory;
      const discount = discounts ? discounts.percentage : 0;
      const totalPrice = price - price * (discount / 100);
      const { name: categorieName } = categories;

      return {
        id,
        name,
        categorie: categorieName,
        description,
        sku,
        image,
        createdAt,
        updatedAt,
        quantity,
        totalPrice,
      };
    });
  }
}
