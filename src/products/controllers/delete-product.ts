import express from "express";
import { ProductsService } from "../service";

export async function deleteProduct(
  req: express.Request,
  res: express.Response,
) {
  try {
    const productId = req.query.productId?.toString();
    const inventoryId = req.query.inventoryId?.toString();

    if (!productId || !inventoryId) {
      res.status(400).json({ ok: false, message: "invalid params" });
      return;
    }

    await ProductsService.deleteProduct(productId, inventoryId);

    res.status(200).json({ ok: true, message: "product deleted" });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.name);
      console.log(error.message);
    }
    res.status(500).json({ ok: false, message: "Server Error" });
  }
}
