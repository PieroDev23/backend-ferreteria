import { Router } from "express";
import { getProductsController } from "./get-products";
import { getProductById } from "./get-product";

export const productsRouter = Router();

productsRouter.get("/get-all", getProductsController);
productsRouter.get("/product/:id", getProductById);
