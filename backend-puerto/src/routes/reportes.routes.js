const express = require('express');
const router = express.Router();
const reportesController = require('../controllers/reportesController');

router.get('/1', reportesController.reporte1);
router.get('/2', reportesController.reporte2);
router.get('/3', reportesController.reporte3);
router.get('/4', reportesController.reporte4);
router.get('/5', reportesController.reporte5);
router.get('/6', reportesController.reporte6);
router.get('/7', reportesController.reporte7);
router.get('/8', reportesController.reporte8);
router.get('/9', reportesController.reporte9);
router.get('/10', reportesController.reporte10);

module.exports = router;