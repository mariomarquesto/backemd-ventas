import { Router } from "express";
import {
  getEmpleados,
  getEmpleadoById,
  createEmpleado,
  deleteEmpleado
} from "../controllers/empleados.controller.js";

const router = Router();

router.get("/", getEmpleados);
router.get("/:id", getEmpleadoById);
router.post("/", createEmpleado);
router.delete("/:id", deleteEmpleado);

export default router;
