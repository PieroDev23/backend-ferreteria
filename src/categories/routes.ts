import { Router } from "express";
import { getCategories } from "./get-categories";

export const categoriesRouter = Router();
categoriesRouter.get("/get-all", getCategories);
