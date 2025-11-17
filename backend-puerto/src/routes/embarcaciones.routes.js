const express = require("express");
const router = express.Router();
const embarcacionesController = require("../controllers/embarcaciones.controller");

router.get("/", embarcacionesController.listar);
router.get("/:id", embarcacionesController.obtenerPorId);
router.post("/", embarcacionesController.crear);
router.put("/:id", embarcacionesController.actualizar);
router.delete("/:id", embarcacionesController.eliminar);

module.exports = router;