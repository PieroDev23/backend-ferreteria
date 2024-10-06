import express from "express";
import { ProductsService } from "./service";

export async function getProductById(
  req: express.Request,
  res: express.Response,
) {
  const product = await ProductsService.getProductById(req.params.id);
  res.json({ ok: true, product });
}
