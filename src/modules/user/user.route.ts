import express, { Router } from "express";
import UserController from "./user.controller";

const UserRouter: Router = express.Router();

UserRouter.get("/", UserController.getUsers);

UserRouter.get("/:id", UserController.getUser);

export default UserRouter;
