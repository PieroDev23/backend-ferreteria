import { Router } from "express";
import { authMiddelware } from "../_auth-middleware";
import { createAddress } from "./http/create-address";
import { getUserAddresses } from "./http/get-address";

export const userAddressesRouter = Router();

userAddressesRouter.post("/create", authMiddelware, createAddress);
userAddressesRouter.get("/", authMiddelware, getUserAddresses);
