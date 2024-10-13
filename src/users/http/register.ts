import express from "express";
import { UserService } from "../service";
import { STATUS_CODES } from "../../_statusCodes";
import { JWT } from "../../_jwt";
import { UserInsertSchema, userInsertSchema } from "../types";
import { logger } from "../../_log.";

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

    const userExists = await UserService.userExistsByEmail(data.email);

    if (userExists) {
      res.status(STATUS_CODES.BAD_REQUEST).json({
        ok: false,
        message: "user already exists",
      });
      return;
    }

    const passwordHashed = UserService.hashPassword(data.password);
    data.password = passwordHashed;

    const [user] = await UserService.createUser(data);

    const token = await new JWT().create(
      user,
      Math.floor(Date.now() / 1000) + 10,
      "CLIENT",
    );

    res.status(STATUS_CODES.OK).json({
      ok: true,
      user,
      token,
    });
  } catch (e) {
    logger.error(e as Error);
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ ok: false });
  }
}
