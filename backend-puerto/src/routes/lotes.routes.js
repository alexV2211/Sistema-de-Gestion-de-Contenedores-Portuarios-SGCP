const express = require("express");
const router = express.Router();
const lotesController = require("../controllers/lotes.controller");

router.get("/", lotesController.listar);
router.get("/:id", lotesController.obtenerPorId);
router.post("/", lotesController.crear);
router.put("/:id", lotesController.actualizar);
router.delete("/:id", lotesController.eliminar);

module.exports = router;
