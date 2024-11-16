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
    const sessionCookie = req.cookies.f_session;
    console.log(sessionCookie);
    const jwt = new JWT();

    if (!sessionCookie) {
      req.headers["user"] = "";
    }

    try {
      const payload = await jwt.verify(sessionCookie);
      console.log(payload);
      req.headers["user"] = JSON.stringify(payload);
    } catch (error) {
      console.log(error);
      req.headers["user"] = "";
    }

    next();
  } catch (error) {
    logger.error(error as Error);
    res.status(STATUS_CODES.UNAUTHORIZED).json({
      ok: false,
      message: "Unauthorized",
    });
  }
}
