import { Router } from "express";
import { loginUser } from "./http/login";
import { registerUser } from "./http/register";

export const usersRouter = Router();

usersRouter.post("/login", loginUser);
usersRouter.post("/register", registerUser);
