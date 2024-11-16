import express from "express";
import { logger } from "../../_log.";
import { STATUS_CODES } from "../../_statusCodes";
import { OrdersRepository } from "../repository";

export async function getOrdersByUser(
  req: express.Request,
  res: express.Response,
) {
  try {
    const user = req.headers["user"] as string | undefined;

    if (!user) {
      res.status(STATUS_CODES.UNAUTHORIZED).json({
        ok: true,
        message: "Unauthorized",
      });
      return;
    }

    const parsedUser = JSON.parse(user);
    const orders = await OrdersRepository.getOrdersByUserId(
      parsedUser.payload.id,
    );

    res.status(STATUS_CODES.OK).json({
      ok: true,
      orders,
    });
  } catch (error) {
    logger.error(error as Error);
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ ok: false, error });
  }
}
