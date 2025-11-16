const express = require("express");
const router = express.Router();
const movimientosController = require("../controllers/movimientos.controller");

router.get("/", movimientosController.listar);
router.get("/:id", movimientosController.obtenerPorId);
router.post("/", movimientosController.crear);
router.put("/:id", movimientosController.actualizar);
router.delete("/:id", movimientosController.eliminar);

module.exports = router;
