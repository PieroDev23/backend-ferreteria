import express from "express";
import { ProductsService } from "../service";
import { productInsertSchema } from "../types";
import { STATUS_CODES } from "../../_statusCodes";

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

    const productCreated = await ProductsService.createProduct(data);
    res.status(STATUS_CODES.OK).json({
      ok: true,
      product: productCreated,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.name);
      console.log(error.message);
    }

    res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ ok: false, message: "Server Error" });
  }
}
