const express = require("express");
const router = express.Router();
const clientesController = require("../controllers/clientes.controller");

router.get("/", clientesController.listar);
router.get("/:id", clientesController.obtenerPorId);
router.post("/", clientesController.crear);
router.put("/:id", clientesController.actualizar);
router.delete("/:id", clientesController.eliminar);

module.exports = router;