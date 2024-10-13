import express from "express";
import { logger } from "../../_log.";
import { STATUS_CODES } from "../../_statusCodes";
import { UserService } from "../service";
import { JWT } from "../../_jwt";

export async function loginUser(req: express.Request, res: express.Response) {
  try {
    const incomingUser: { email: string; password: string } = req.body;
    const user = await UserService.userExistsByEmail(incomingUser.email);
    if (!user) {
      res.status(STATUS_CODES.BAD_REQUEST).json({
        ok: false,
        message: "Bad Credentials",
      });
      return;
    }

    const { password, ...currentUser } = user;
    const isPasswordCorrect = UserService.comparePasswords(
      incomingUser.password,
      password,
    );
    if (!isPasswordCorrect) {
      res.status(STATUS_CODES.BAD_REQUEST).json({
        ok: false,
        message: "Bad Credentials",
      });
      return;
    }

    const token = await new JWT().create(
      currentUser,
      Math.floor(Date.now() / 1000) + 10,
      "CLIENT",
    );

    res.status(STATUS_CODES.OK).json({
      ok: true,
      user: currentUser,
      token,
    });
  } catch (e) {
    logger.error(e as Error);
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ ok: false });
  }
}
