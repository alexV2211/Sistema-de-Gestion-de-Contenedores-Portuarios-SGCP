const express = require("express");
const router = express.Router();
const productosController = require("../controllers/productos.controller");

router.get("/", productosController.listar);
router.get("/:id", productosController.obtenerPorId);
router.post("/", productosController.crear);
router.put("/:id", productosController.actualizar);
router.delete("/:id", productosController.eliminar);

module.exports = router;
