import express from "express";
import { ProductsService } from "../service";
import { STATUS_CODES } from "../../_statusCodes";

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
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.name);
      console.error(error.message);
    }

    res.status(500).json({ ok: false, message: "Server error" });
  }
}
