import express from "express";
import { logger } from "../../_log.";
import { STATUS_CODES } from "../../_statusCodes";
import { UserService } from "../service";
import { JWT } from "../../jwt";
import { UserRepository } from "../repository";
import { clientAuthSchema } from "../types";

export async function loginUser(req: express.Request, res: express.Response) {
  try {
    const { success, error, data } = clientAuthSchema.safeParse(req.body);
    if (!success) {
      res.status(STATUS_CODES.BAD_REQUEST).json({
        ok: false,
        error,
      });
      return;
    }

    const [user] = await UserRepository.findUserByEmail(data.email);
    if (!user) {
      res.status(STATUS_CODES.BAD_REQUEST).json({
        ok: false,
        message: "Credenciales incorrectas",
      });
      return;
    }

    const { password, ...currentUser } = user;
    const isPasswordCorrect = UserService.comparePasswords(
      data.password,
      password,
    );

    if (!isPasswordCorrect) {
      res.status(STATUS_CODES.BAD_REQUEST).json({
        ok: false,
        message: "Credenciales incorrectas",
      });
      return;
    }

    const token = await new JWT().create(currentUser, "1 hour", "CLIENT");

    res.cookie("f_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict", // Usa 'lax' en vez de 'strict'
      maxAge: 3600 * 1000,
    });

    res.status(STATUS_CODES.OK).json({
      ok: true,
      user: currentUser,
    });
  } catch (e) {
    logger.error(e as Error);
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ ok: false });
  }
}
