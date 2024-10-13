import cors from "cors";
import "dotenv/config";
import express from "express";
import morgan from "morgan";
import { pool } from "./db";
import { categoriesRouter } from "./categories/routes";
import { productsRouter } from "./products/routes";
import { AppError } from "./_error";
import { usersRouter } from "./users/routes";
import { logger } from "./_log.";

export class FerreteriaApp {
  private _app: express.Express;

  constructor() {
    this._app = express();
    this.middlewares();
    this.routes();
    this.dbConnection();
  }

  routes() {
    const baseRoute = "/api/v1";
    this._app.use(`${baseRoute}/products`, productsRouter);
    this._app.use(`${baseRoute}/categories`, categoriesRouter);
    this._app.use(`${baseRoute}/users`, usersRouter);
  }

  middlewares() {
    this._app.disable("x-powered-by");
    this._app.use(express.json());
    this._app.use(morgan("dev"));
    this._app.use(cors());
  }

  async dbConnection() {
    try {
      await pool.connect();
      logger.info("🚀 Database connected");
    } catch (error) {
      const appError = AppError.fromError(error as Error);
      logger.error(appError);
      throw appError;
    }
  }

  run() {
    const port = process.env["APP_PORT"];
    if (!port) {
      logger.error("port is not defined");
      return;
    }

    this._app.listen(port, () => {
      logger.info(`✨ Application running on port ${port}`);
    });
  }
}
