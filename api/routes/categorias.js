import express from "express";
import { 
    getCategorias,
    getProjetos, 
    addCategoria, 
    addProjetos,
    updateCategoria,
    updateProjetos, 
    deleteCategoria,
    deleteProjetos, 
    getPrioridades
} from "../controllers/categorias.js";

const router = express.Router();

router.get("/categorias", getCategorias);
router.get("/projetos", getProjetos);
router.get("/prioridades", getPrioridades);

router.post("/categorias", addCategoria);
router.post("/projetos", addProjetos);

router.put("/categorias:id", updateCategoria);
router.put("/projetos:id", updateProjetos);

router.delete("/categorias:id", deleteCategoria);
router.delete("/projetos:id", deleteProjetos);

export default router;