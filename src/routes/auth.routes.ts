import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";

const routerAuth = Router();

routerAuth.post("/", authController.login);

export default routerAuth;
