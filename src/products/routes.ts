import { Router } from "express";
import { createProduct } from "./http/create-product";
import { deleteProduct } from "./http/delete-product";
import { getProductById } from "./http/get-product";
import { getProducts } from "./http/get-products";
import { updateProduct } from "./http/update-product";

export const productsRouter = Router();

productsRouter.get("/", getProducts);
productsRouter.get("/:id", getProductById);
productsRouter.post("/create", createProduct);
productsRouter.put("/update", updateProduct);
productsRouter.delete("/delete", deleteProduct);
