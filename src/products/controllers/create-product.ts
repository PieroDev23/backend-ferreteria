import express from "express";
import { ProductsService } from "../service";
import { productInsertSchema } from "../types";

export async function createProduct(
  req: express.Request,
  res: express.Response,
) {
  try {
    const { success, error, data } = productInsertSchema.safeParse(req.body);

    if (!success) {
      res.status(400).json({ ok: false, error });
      return;
    }

    const productCreated = await ProductsService.createProduct(data);
    res.status(200).json({ ok: true, product: productCreated });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.name);
      console.log(error.message);
    }

    res.status(500).json({ ok: false, message: "Server Error" });
  }
}
