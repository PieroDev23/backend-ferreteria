import express from "express";
import { logger } from "../../_log.";
import { STATUS_CODES } from "../../_statusCodes";

export async function createOrder(req: express.Request, res: express.Response) {
  try {
    console.log(req.body);
  } catch (error) {
    logger.error(error as Error);
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ ok: false });
  }
}
