import { Router } from "express";
import { getCategoires } from "./get-categories";

export const categoriesRouter = Router();
categoriesRouter.get("/get-all", getCategoires);
