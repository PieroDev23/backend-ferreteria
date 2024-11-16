import express from "express";
import { logger } from "../../_log.";
import { STATUS_CODES } from "../../_statusCodes";
import { OrdersRepository } from "../repository";

export async function updateStatusOrder(
  req: express.Request,
  res: express.Response,
) {
  try {
    const order = await OrdersRepository.updateOrder(req.body);
    res.status(STATUS_CODES.OK).json({
      ok: true,
      order,
    });
  } catch (error) {
    logger.error(error as Error);
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ ok: false, error });
  }
}
