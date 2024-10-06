import cors from "cors";
import "dotenv/config";
import express from "express";
import morgan from "morgan";
import { pool } from "./db";
import { categoriesRouter } from "./categories/routes";
import { productsRouter } from "./products/routes";

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
  }

  middlewares() {
    this._app.use(express.json());
    this._app.disable("x-powered-by");
    this._app.use(morgan("dev"));
    this._app.use(cors());
  }

  async dbConnection() {
    try {
      await pool.connect();
      console.log("🚀 Database connected");
    } catch (error) {
      if (error instanceof Error) {
        console.log(`${error.name}: ${error.message}`);
      }
    }
  }

  run() {
    const port = process.env["APP_PORT"];

    if (!port) {
      console.log("port is needed");
      return;
    }

    this._app.listen(port, () => {
      console.log(`🐸 Application strated on port ${port}`);
    });
  }
}
