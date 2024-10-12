import express from "express";
import { ProductsService } from "../service";
import { STATUS_CODES } from "../../_statusCodes";

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
