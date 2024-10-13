import express from "express";
import { ProductsService } from "../service";
import { STATUS_CODES } from "../../_statusCodes";
import { logger } from "../../_log.";

export async function getProductById(
  req: express.Request,
  res: express.Response,
) {
  try {
    const productId = req.params.id;
    if (!productId) {
      res.status(STATUS_CODES.BAD_REQUEST).json({
        ok: false,
        message: "Product id is not provided",
      });
      return;
    }

    const product = await ProductsService.getProductById(req.params.id);
    if (!product) {
      res.status(STATUS_CODES.BAD_REQUEST).json({
        ok: false,
        message: "Product not founded",
      });
      return;
    }

    res.status(STATUS_CODES.OK).json({
      ok: true,
      product,
    });
  } catch (e) {
    logger.error(e as Error);
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ ok: false });
  }
}
