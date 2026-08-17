import { Router } from "express";
import * as relatoriosController from "../controllers/relatorios.controller.js";
import { autenticar } from "../middlewares/auth.middleware.js";

const routerRelatorios = Router();

routerRelatorios.use(autenticar);

routerRelatorios.post("/", relatoriosController.gerarRelatorio);

export default routerRelatorios;
