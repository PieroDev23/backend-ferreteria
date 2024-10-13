import express from "express";
import { ProductsService } from "../service";
import { productInsertSchema } from "../types";
import { STATUS_CODES } from "../../_statusCodes";
import { logger } from "../../_log.";

export async function createProduct(
  req: express.Request,
  res: express.Response,
) {
  try {
    const { success, error, data } = productInsertSchema.safeParse(req.body);
    if (!success) {
      res.status(STATUS_CODES.BAD_REQUEST).json({
        ok: false,
        error,
      });
      return;
    }

    const product = await ProductsService.createProduct(data);
    res.status(STATUS_CODES.OK).json({
      ok: true,
      product,
    });
  } catch (e) {
    logger.error(e as Error);
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ ok: false });
  }
}
