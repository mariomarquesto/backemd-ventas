import { Router } from "express";
import { getCompras, createCompra } from "../controllers/compras.controller.js";

const router = Router();

router.get("/", getCompras);
router.post("/", createCompra);

export default router;
