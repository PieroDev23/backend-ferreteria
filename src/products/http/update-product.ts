import express from "express";
import { ProductsService } from "../service";
import { productUpdateSchema } from "../types";
import { STATUS_CODES } from "../../_statusCodes";
import { logger } from "../../_log.";

export async function updateProduct(
  req: express.Request,
  res: express.Response,
) {
  try {
    const product = req.body;
    const { success, data, error } = productUpdateSchema.safeParse(product);

    if (!success) {
      res.status(STATUS_CODES.BAD_REQUEST).json({
        message: "invalid schema",
        error,
      });
      return;
    }

    await ProductsService.updateProduct(data);
    res.status(STATUS_CODES.OK).json({
      ok: true,
      product: data,
    });
  } catch (e) {
    logger.error(e as Error);
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ ok: false });
  }
}
