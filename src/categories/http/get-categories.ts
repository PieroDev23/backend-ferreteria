import express from "express";
import { categories, db } from "../../db";
import { STATUS_CODES } from "../../_statusCodes";

export async function getCategories(
  req: express.Request,
  res: express.Response,
) {
  const response = await db.select().from(categories);
  res.status(STATUS_CODES.OK).json({
    ok: true,
    response,
  });
}
