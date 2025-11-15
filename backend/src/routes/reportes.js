import express from "express";
import { generarReporte1 } from "../controllers/reporteController.js";
const router = express.Router();

router.get("/reporte1", generarReporte1);

export default router;
