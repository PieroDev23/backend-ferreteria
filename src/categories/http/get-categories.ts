import express from "express";
import { categories, db } from "../../db";
import { STATUS_CODES } from "../../_statusCodes";
import { logger } from "../../_log.";

export async function getCategories(
  req: express.Request,
  res: express.Response,
) {
  try {
    const response = await db.select().from(categories);
    res.status(STATUS_CODES.OK).json({
      ok: true,
      categories: response,
    });
  } catch (e) {
    logger.error(e as Error);
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ ok: false });
  }
}
