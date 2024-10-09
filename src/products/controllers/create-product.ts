import express from "express";
import { ProductsService } from "../service";
import { inventoryInsertSchema } from "../../inventory/types";
import { productInsertSchema } from "../types";

export async function createProduct(
  req: express.Request,
  res: express.Response,
) {
  try {
    const { product, inventory } = req.body;

    const inventoryInsert = inventoryInsertSchema.safeParse(inventory);
    const productInsert = productInsertSchema.safeParse(product);

    if (!inventoryInsert.success) {
      res.status(400).json({ ok: false, error: inventoryInsert.error });
      return;
    }

    if (!productInsert.success) {
      res.status(400).json({ ok: false, error: productInsert.error });
      return;
    }

    const { data: inventoryData } = inventoryInsert;
    const { data: productData } = productInsert;

    const productCreated = await ProductsService.createProduct(
      productData,
      inventoryData,
    );
    res.status(200).json({ ok: true, product: productCreated });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.name);
      console.log(error.message);
    }

    res.status(500).json({ ok: false, message: "Server Error" });
  }
}
