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
    getProjetosUnico,
    getServicos,
    addServicos,
    updateServicos,
    deleteServicos

} from "../controllers/categorias.js";

const router = express.Router();

router.get("/categorias", getCategorias);
router.get("/projetos", getProjetos);
router.get("/projetos:id", getProjetosUnico);
router.get("/servicos", getServicos);

router.post("/categorias", addCategoria);
router.post("/projetos", addProjetos);
router.post("/servicos", addServicos);

router.put("/categorias:id", updateCategoria);
router.put("/projetos:id", updateProjetos);
router.put("/servicos:id", updateServicos);

router.delete("/categorias:id", deleteCategoria);
router.delete("/projetos:id", deleteProjetos);
router.delete("/servicos:id", deleteServicos);

export default router;