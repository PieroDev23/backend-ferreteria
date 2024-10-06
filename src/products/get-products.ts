import express from "express";

export async function getProductsController(
  req: express.Request,
  res: express.Response,
) {
  res.json({
    ok: true,
  });
}
