import express from "express";
import { ProductsService } from "../service";

export async function getProductById(
  req: express.Request,
  res: express.Response,
) {
  try {
    const productId = req.params.id;
    if (!productId) {
      res
        .status(404)
        .json({ ok: false, message: "Product id is not provided" });
      return;
    }

    const result = await ProductsService.getProductById(req.params.id);
    if (!result) {
      res.status(404).json({ ok: false, message: "Product not founded" });
      return;
    }

    res.status(200).json({ ok: true, product: result });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.name);
      console.error(error.message);
    }

    res.status(500).json({ ok: false, message: "Server error" });
  }
}
