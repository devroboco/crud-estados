import { Router } from "express";
import * as cidadesController from "../controllers/cidades.controller.js";
import { autenticar } from "../middlewares/auth.middleware.js";

const routerCidades = Router();

routerCidades.use(autenticar);

routerCidades.get("/", cidadesController.listar);
routerCidades.get("/quantidade", cidadesController.contarPorEstado);
routerCidades.get("/:id", cidadesController.buscar);
routerCidades.post("/", cidadesController.criar);
routerCidades.put("/:id", cidadesController.atualizar);
routerCidades.delete("/:id", cidadesController.deletar);

export default routerCidades;
