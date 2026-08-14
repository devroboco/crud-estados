import { Router } from "express";
import * as usuarioscontroller from "../controllers/usuarios.controller.js";

const routerUsuarios = Router();

routerUsuarios.post("/", usuarioscontroller.cadastrar);

export default routerUsuarios;
