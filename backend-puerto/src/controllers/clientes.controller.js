const clientesService = require('../services/clientes.service');

class ClientesController {
  
  // GET /api/clientes
  async obtenerTodos(req, res, next) {
    try {
      const clientes = await clientesService.obtenerTodos();
      res.json({
        ok: true,
        data: clientes
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /api/clientes/:id
  async obtenerPorId(req, res, next) {
    try {
      const { id } = req.params;
      const cliente = await clientesService.obtenerPorId(id);
      res.json({
        ok: true,
        data: cliente
      });
    } catch (error) {
      next(error);
    }
  }

  // POST /api/clientes
  async crear(req, res, next) {
    try {
      const nuevoCliente = await clientesService.crear(req.body);
      res.status(201).json({
        ok: true,
        data: nuevoCliente,
        mensaje: 'Cliente creado exitosamente'
      });
    } catch (error) {
      next(error);
    }
  }

  // PUT /api/clientes/:id
  async actualizar(req, res, next) {
    try {
      const { id } = req.params;
      const clienteActualizado = await clientesService.actualizar(id, req.body);
      res.json({
        ok: true,
        data: clienteActualizado,
        mensaje: 'Cliente actualizado exitosamente'
      });
    } catch (error) {
      next(error);
    }
  }

  // DELETE /api/clientes/:id
  async eliminar(req, res, next) {
    try {
      const { id } = req.params;
      const resultado = await clientesService.eliminar(id);
      res.json({
        ok: true,
        mensaje: resultado.mensaje
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /api/clientes/buscar/:nombre
  async buscarPorNombre(req, res, next) {
    try {
      const { nombre } = req.params;
      const clientes = await clientesService.buscarPorNombre(nombre);
      res.json({
        ok: true,
        data: clientes
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /api/clientes/:id/contenedores
  async obtenerContenedores(req, res, next) {
    try {
      const { id } = req.params;
      const contenedores = await clientesService.obtenerContenedores(id);
      res.json({
        ok: true,
        data: contenedores
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ClientesController();