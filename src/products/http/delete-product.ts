import express from "express";
import { ProductsService } from "../service";
import { STATUS_CODES } from "../../_statusCodes";
import { logger } from "../../_log.";

export async function deleteProduct(
  req: express.Request,
  res: express.Response,
) {
  try {
    const { productId, inventoryId } = req.params;

    if (!productId || !inventoryId) {
      res.status(STATUS_CODES.BAD_REQUEST).json({
        ok: false,
        message: "invalid params",
      });
      return;
    }

    await ProductsService.deleteProduct(productId, inventoryId);

    res.status(STATUS_CODES.OK).json({ ok: true, message: "product deleted" });
  } catch (e) {
    logger.error(e as Error);
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ ok: false });
  }
}
