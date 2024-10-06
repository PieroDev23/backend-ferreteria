import express from "express";
import { categories, db } from "../db";

export async function getCategoires(
  req: express.Request,
  res: express.Response,
) {
  const response = await db.select().from(categories);
  res.json({
    ok: true,
    response,
  });
}
