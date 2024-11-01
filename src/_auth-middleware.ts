import express from "express";
import { STATUS_CODES } from "./_statusCodes";
import { logger } from "./_log.";
import { JWT } from "./jwt";

export async function authMiddelware(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  try {
    const headers = req.headers;
    if (!headers.authorization || !headers.authorization.includes("Bearer")) {
      res.status(STATUS_CODES.UNAUTHORIZED).json({
        ok: false,
        message: "Unauthorized",
      });
      return;
    }

    const [, token] = headers.authorization.split("Bearer ");
    const itsValid = await new JWT().verify(token, "CLIENT");
    logger.debug("IS VALID TOKEN", { itsValid });
    next();
  } catch (error) {
    logger.error(error as Error);
    res.status(STATUS_CODES.UNAUTHORIZED).json({
      ok: false,
      message: "Unauthorized",
    });
  }
}
