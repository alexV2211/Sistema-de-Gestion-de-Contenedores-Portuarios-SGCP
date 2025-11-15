const express = require('express');
const router = express.Router();
const contenedorController = require('../controllers/contenedorController');

router.get('/', contenedorController.listarContenedores);
router.get('/:id', contenedorController.obtenerContenedorPorId);
router.post('/', contenedorController.crearContenedor);
router.put('/:id', contenedorController.actualizarContenedor);
router.delete('/:id', contenedorController.eliminarContenedor);

module.exports = router;