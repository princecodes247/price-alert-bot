import express, { Request, Response, NextFunction } from "express";
import path from "path";
import { Application, Router } from "express";

import { PriceRouter } from "./modules/price";
import { UserRouter } from "./modules/user";
import { sendResponse } from "./utils/sendResponse";
import { StatusCodes } from "http-status-codes";

const router: Router = Router();

router.use("/prices", PriceRouter);
router.use("/user", PriceRouter);

const routes = (app: Application) => {
  app.use("/api/v1", router);

  // Error handler for 404 - Page Not Found
  app.use((req: Request, res: Response, next) => {
    console.log("---- 404 error handler", req.originalUrl);
    sendResponse({
      res,
      status: StatusCodes.NOT_FOUND,
      message: "Sorry, page not found!",
      success: false,
    });
  });

  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err) {
      sendResponse({
        res,
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: err.message,
        success: false,
        // error: err,
      });
      next();
    }
  });
};

export default routes;
