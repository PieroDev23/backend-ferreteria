import express from "express";
import { UserService } from "../service";
import { STATUS_CODES } from "../../_statusCodes";
import { JWT } from "../../jwt";
import { UserInsertSchema, userInsertSchema } from "../types";
import { logger } from "../../_log.";
import { UserRepository } from "../repository";

export async function registerUser(
  req: express.Request,
  res: express.Response,
) {
  try {
    const newUser: UserInsertSchema = req.body;
    const { success, data, error } = userInsertSchema.safeParse(newUser);
    if (!success) {
      res.status(STATUS_CODES.BAD_REQUEST).json({
        ok: false,
        error,
      });
      return;
    }

    const [userExists] = await UserRepository.findUserByEmail(data.email);
    if (userExists) {
      res.status(STATUS_CODES.BAD_REQUEST).json({
        ok: false,
        message: "ya existe un usuario con estas credenciales",
      });
      return;
    }

    const passwordHashed = UserService.hashPassword(data.password);
    data.password = passwordHashed;

    const [user] = await UserRepository.createUser(data);
    const token = await new JWT().create(user, "1 hour", "CLIENT");

    res.cookie("f_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict", // Usa 'lax' en vez de 'strict'
      maxAge: 3600 * 1000,
    });

    res.status(STATUS_CODES.OK).json({
      ok: true,
      user,
    });
  } catch (e) {
    logger.error(e as Error);
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ ok: false });
  }
}
