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
    console.log(user);

    if (!user) {
      res.status(STATUS_CODES.UNAUTHORIZED).json({
        ok: true,
        message: "Unauthorized",
      });
      return;
    }

    console.log(JSON.parse(user).payload.id);

    const orders = await OrdersRepository.getOrdersByUserId(
      JSON.parse(user).payload.id,
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
