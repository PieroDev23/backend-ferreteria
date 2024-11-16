import express from "express";
import { logger } from "../../_log.";
import { STATUS_CODES } from "../../_statusCodes";
import { OrdersRepository } from "../repository";

export async function getOrders(req: express.Request, res: express.Response) {
  try {
    const orders = await OrdersRepository.getOrders();
    res.status(STATUS_CODES.OK).json({ orders });
  } catch (error) {
    logger.error(error as Error);
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ ok: false });
  }
}
