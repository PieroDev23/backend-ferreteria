import express from "express";
import { userInserSchema, UserInserSchema } from "../types";
import { UserService } from "../service";
import { STATUS_CODES } from "../../_statusCodes";
import { JWT } from "../../_jwt";

export async function registerUser(
  req: express.Request,
  res: express.Response,
) {
  try {
    const newUser: UserInserSchema = req.body;
    const { success, data, error } = userInserSchema.safeParse(newUser);

    if (!success) {
      res.status(STATUS_CODES.BAD_REQUEST).json({
        ok: false,
        error,
      });
      return;
    }

    const userExists = await UserService.userExists(data.email);
    if (!userExists) {
      res.status(STATUS_CODES.BAD_REQUEST).json({
        ok: false,
        message: "user already exists",
      });
      return;
    }

    const passwordHashed = UserService.hashPassword(data.password);
    data.password = passwordHashed;

    const [user] = await UserService.createUser(data);

    const jwt = await new JWT().create(
      user,
      Math.floor(Date.now() / 1000) + 10,
      "CLIENT",
    );

    res.status(STATUS_CODES.OK).json({
      ok: true,
      user: {
        ...user,
        jwt,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.name);
      console.log(error.message);
    }
    res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ ok: false, message: "Server Error" });
  }
}
