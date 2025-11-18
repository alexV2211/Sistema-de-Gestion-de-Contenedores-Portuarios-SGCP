const embarcacionesService = require('../services/embarcaciones.service');

class EmbarcacionesController {
  
  // GET /api/embarcaciones
  async obtenerTodos(req, res, next) {
    try {
      const embarcaciones = await embarcacionesService.obtenerTodos();
      res.json({
        ok: true,
        data: embarcaciones
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /api/embarcaciones/:id
  async obtenerPorId(req, res, next) {
    try {
      const { id } = req.params;
      const embarcacion = await embarcacionesService.obtenerPorId(id);
      res.json({
        ok: true,
        data: embarcacion
      });
    } catch (error) {
      next(error);
    }
  }

  // POST /api/embarcaciones
  async crear(req, res, next) {
    try {
      const nuevaEmbarcacion = await embarcacionesService.crear(req.body);
      res.status(201).json({
        ok: true,
        data: nuevaEmbarcacion,
        mensaje: 'Embarcación creada exitosamente'
      });
    } catch (error) {
      next(error);
    }
  }

  // PUT /api/embarcaciones/:id
  async actualizar(req, res, next) {
    try {
      const { id } = req.params;
      const embarcacionActualizada = await embarcacionesService.actualizar(id, req.body);
      res.json({
        ok: true,
        data: embarcacionActualizada,
        mensaje: 'Embarcación actualizada exitosamente'
      });
    } catch (error) {
      next(error);
    }
  }

  // DELETE /api/embarcaciones/:id
  async eliminar(req, res, next) {
    try {
      const { id } = req.params;
      const resultado = await embarcacionesService.eliminar(id);
      res.json({
        ok: true,
        mensaje: resultado.mensaje
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /api/embarcaciones/buscar/:nombre
  async buscarPorNombre(req, res, next) {
    try {
      const { nombre } = req.params;
      const embarcaciones = await embarcacionesService.buscarPorNombre(nombre);
      res.json({
        ok: true,
        data: embarcaciones
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /api/embarcaciones/en-puerto
  async obtenerEnPuerto(req, res, next) {
    try {
      const embarcaciones = await embarcacionesService.obtenerEnPuerto();
      res.json({
        ok: true,
        data: embarcaciones
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /api/embarcaciones/:id/contenedores
  async obtenerContenedores(req, res, next) {
    try {
      const { id } = req.params;
      const contenedores = await embarcacionesService.obtenerContenedores(id);
      res.json({
        ok: true,
        data: contenedores
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new EmbarcacionesController();