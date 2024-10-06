import { Product } from "../../db";

export const formatProduct = ({
  products,
  inventory,
  discounts,
  categories,
}: Product) => {
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
    price,
    image,
    createdAt,
    updatedAt,
    quantity,
    totalPrice,
  };
};
