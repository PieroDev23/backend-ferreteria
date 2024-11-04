import { Router } from "express";
import { getCategories } from "./http/get-categories";

export const categoriesRouter = Router();
categoriesRouter.get("/", getCategories);
