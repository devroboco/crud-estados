import { Router } from "express";
import * as cidadesController from "../controllers/cidades.controllers.js";

const router = Router();

router.get('/', cidadesController.listar);
router.get('/:id', cidadesController.buscar);
router.post('/', cidadesController.criar);
router.put('/:id', cidadesController.atualizar);
router.delete('/:id', cidadesController.deletar);

export default router;