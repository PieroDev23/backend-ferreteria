import express from "express";
import { logger } from "../../_log.";
import { STATUS_CODES } from "../../_statusCodes";
import { UserAdressesRepository } from "../repository";

export async function getUserAddresses(
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

    const addresses = await UserAdressesRepository.getUserAddress(
      JSON.parse(user).payload.id,
    );

    res.status(STATUS_CODES.OK).json({
      ok: true,
      addresses,
    });
  } catch (error) {
    logger.error(error as Error);
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ ok: false });
  }
}
