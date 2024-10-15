import { Router } from "express";
import { loginUser } from "./http/login";
import { registerUser } from "./http/register";
import { createAdresses } from "./http/create-addresses";
import { authMiddelware } from "../_auth-middleware";

export const usersRouter = Router();

usersRouter.post("/login", loginUser);
usersRouter.post("/register", registerUser);
usersRouter.post("/create-address", authMiddelware, createAdresses);
