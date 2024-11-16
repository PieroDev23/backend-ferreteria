import { Router } from "express";
import { createOrder } from "./http/create-order";
import { authMiddelware } from "../_auth-middleware";
import { getOrderById } from "./http/get-order";
import { getOrders } from "./http/get-orders";
import { getOrdersByUser } from "./http/get-user-orders";
import { updateStatusOrder } from "./http/update-status-order";

export const ordersRouter = Router();

ordersRouter.post("/create", authMiddelware, createOrder);
ordersRouter.get("/user", authMiddelware, getOrdersByUser);
ordersRouter.get("/:id", getOrderById);
ordersRouter.put("/update", updateStatusOrder);
ordersRouter.get("/", getOrders);
