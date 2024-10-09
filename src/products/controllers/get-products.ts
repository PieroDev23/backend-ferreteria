import express from "express";
import { ProductsService } from "../service";

export async function getProductsController(
  req: express.Request,
  res: express.Response,
) {
  const products = await ProductsService.getProducts();
  res.json({
    ok: true,
    products,
  });
}
