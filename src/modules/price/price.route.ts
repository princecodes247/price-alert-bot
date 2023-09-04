import express, { Router } from "express";
import PriceController from "./price.controller";
import validateRequest from "../../middleware/validateRequest";
import upload from "../../middleware/upload";

const PriceRouter: Router = express.Router();

PriceRouter.get("/", PriceController.getEthPrice);

export default PriceRouter;
