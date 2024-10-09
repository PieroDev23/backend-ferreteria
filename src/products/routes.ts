import { Router } from "express";
import { updateProduct } from "./update-product";
import { getProductById } from "./controllers/get-product";
import { getProducts } from "./controllers/get-products";
import { createProduct } from "./controllers/create-product";
import { deleteProduct } from "./controllers/delete-product";

export const productsRouter = Router();

productsRouter.post("/create", createProduct);
productsRouter.get("/get-all", getProducts);
productsRouter.get("/get-one/:id", getProductById);
productsRouter.put("/product-update", updateProduct);
productsRouter.delete("/delete", deleteProduct);
