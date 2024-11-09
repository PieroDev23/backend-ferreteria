import { Router } from "express";
import { createOrder } from "./http/create-order";

export const ordersRouter = Router();

ordersRouter.post("/create", createOrder);
