import express from "express";
import { ProductsService } from "../service";
import { STATUS_CODES } from "../../_statusCodes";
import { logger } from "../../_log.";

export async function getProducts(req: express.Request, res: express.Response) {
  try {
    const products = await ProductsService.getProducts();
    res.status(STATUS_CODES.OK).json({
      ok: true,
      products,
    });
  } catch (e) {
    logger.error(e as Error);
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ ok: false });
  }
}
