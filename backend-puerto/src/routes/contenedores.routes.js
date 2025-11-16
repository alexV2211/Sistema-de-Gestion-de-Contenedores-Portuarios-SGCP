const express = require("express");
const router = express.Router();
const contenedoresController = require("../controllers/contenedores.controller");

router.get("/", contenedoresController.listar);
router.get("/:id", contenedoresController.obtenerPorId);
router.post("/", contenedoresController.crear);
router.put("/:id", contenedoresController.actualizar);
router.delete("/:id", contenedoresController.eliminar);

module.exports = router;