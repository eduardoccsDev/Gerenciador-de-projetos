import express from "express";
import { getCategorias, addCategoria, updateCategoria, deleteCategoria } from "../controllers/categorias.js";

const router = express.Router();

router.get("/categorias", getCategorias);

router.post("/categorias", addCategoria);

router.put("/categorias:id", updateCategoria);

router.delete("/categorias:id", deleteCategoria);

export default router;