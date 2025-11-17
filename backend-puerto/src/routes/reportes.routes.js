const express = require('express');
const router = express.Router();
const reportesController = require('../controllers/reportesController');

// Reportes sin parámetros
router.get('/contenedores-activos', reportesController.reporte1);
router.get('/ranking-clientes', reportesController.reporte2);
router.get('/productos-mensuales', reportesController.reporte4);
router.get('/embarcaciones-contenedores', reportesController.reporte6);
router.get('/estado-puerto', reportesController.reporte7);
router.get('/contenedores-abandonados', reportesController.reporte8);
router.get('/alertas-detalle', reportesController.reporte9);
router.get('/auditoria-usuarios', reportesController.reporte10);

// Reportes con parámetros
router.get('/contenedores-proxima-salida', reportesController.reporte3);
router.get('/historial-contenedor/:id', reportesController.reporte5);

module.exports = router;