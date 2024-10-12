import express from "express";
import { ProductsService } from "../service";
import { STATUS_CODES } from "../../_statusCodes";

export async function getProducts(req: express.Request, res: express.Response) {
  const products = await ProductsService.getProducts();
  res.status(STATUS_CODES.OK).json({
    ok: true,
    products,
  });
}
