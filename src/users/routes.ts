import { Router } from "express";
import { loginUser } from "./http/login";
import { registerUser } from "./http/register";

export const userRouter = Router();

userRouter.post("/login", loginUser);
userRouter.post("/register", registerUser);
