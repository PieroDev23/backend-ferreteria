import express from "express";
import { logger } from "../../_log.";
import { STATUS_CODES } from "../../_statusCodes";
import { UserAdressesRepository } from "../repository";
import { insertUserAddressSchema } from "../types";

export async function createAddress(
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

    const { success, data, error } = insertUserAddressSchema.safeParse(
      req.body,
    );

    if (!success) {
      res.status(STATUS_CODES.BAD_REQUEST).json({
        ok: false,
        error,
      });
      return;
    }

    const address = await UserAdressesRepository.createUserAddress(data);

    res.status(STATUS_CODES.OK).json({
      ok: true,
      address,
    });
  } catch (error) {
    logger.error(error as Error);
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ ok: false });
  }
}
