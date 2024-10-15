import express from "express";
import { ProductsService } from "../service";
import { STATUS_CODES } from "../../_statusCodes";
import { logger } from "../../_log.";
import { productDeleteSchema } from "../types";

export async function deleteProduct(
  req: express.Request,
  res: express.Response,
) {
  try {
    const { success, data, error } = productDeleteSchema.safeParse(req.body);
    if (!success) {
      res.status(STATUS_CODES.BAD_REQUEST).json({
        ok: false,
        error,
      });
      return;
    }

    const { productId, inventoryId } = data;
    await ProductsService.deleteProduct(productId, inventoryId);

    res.status(STATUS_CODES.OK).json({ ok: true, message: "product deleted" });
  } catch (e) {
    logger.error(e as Error);
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ ok: false });
  }
}
