import { Router } from "express";
import { updateProduct } from "./update-product";
import { getProductById } from "./controllers/get-product";
import { getProducts } from "./controllers/get-products";
import { createProduct } from "./controllers/create-product";
import { deleteProduct } from "./controllers/delete-product";

export const productsRouter = Router();

productsRouter.get("/", getProducts);
productsRouter.get("/:id", getProductById);
productsRouter.post("/create", createProduct);
productsRouter.put("/update", updateProduct);
productsRouter.delete("/delete/:productId/:inventoryId", deleteProduct);
