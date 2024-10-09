import express from "express";
import { ProductsService } from "../service";
import { productUpdateSchema } from "../types";

export async function updateProduct(
  req: express.Request,
  res: express.Response,
) {
  try {
    const product = req.body;
    const { success, data, error } = productUpdateSchema.safeParse(product);

    if (!success) {
      res.status(400).json({
        message: "invalid schema",
        error,
      });
      return;
    }

    await ProductsService.updateProduct(data);
    res.status(200).json({ ok: true, product: data });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.name);
      console.log(error.message);
    }

    res.status(500).json({ ok: false, message: "Server Error" });
  }
}
