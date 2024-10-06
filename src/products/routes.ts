import { Router } from "express";
import { getProductsController } from "./get-products";

export const productsRouter = Router();
productsRouter.get("/get-all", getProductsController);
