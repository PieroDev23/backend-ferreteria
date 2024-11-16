import express from "express";
import { OrdersRepository } from "../repository";
import { logger } from "../../_log.";
import { STATUS_CODES } from "../../_statusCodes";

export async function getOrderById(
  req: express.Request,
  res: express.Response,
) {
  try {
    const orderId = req.params.id;
    const orderDetails = await OrdersRepository.getOrderDetails(orderId);

    console.log({ orderDetails });

    res.status(STATUS_CODES.OK).json({
      ok: true,
      orderDetails,
    });
  } catch (error) {
    logger.error(error as Error);
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ ok: false });
  }
}
