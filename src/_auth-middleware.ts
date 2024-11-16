import express from "express";
import { JWT } from "./jwt";

export async function authMiddelware(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  const sessionCookie = req.cookies.f_session;
  const jwt = new JWT();

  if (!sessionCookie) {
    req.headers["user"] = "";
  }

  try {
    const payload = await jwt.verify(sessionCookie);
    req.headers["user"] = JSON.stringify(payload);
  } catch (error) {
    console.log(error);
    req.headers["user"] = "";
  }

  next();
}
