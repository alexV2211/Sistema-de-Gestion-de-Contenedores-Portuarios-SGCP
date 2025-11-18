const productosService = require('../services/productos.service');

class ProductosController {
  
  // GET /api/productos
  async obtenerTodos(req, res, next) {
    try {
      const productos = await productosService.obtenerTodos();
      res.json({
        ok: true,
        data: productos
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /api/productos/:id
  async obtenerPorId(req, res, next) {
    try {
      const { id } = req.params;
      const producto = await productosService.obtenerPorId(id);
      res.json({
        ok: true,
        data: producto
      });
    } catch (error) {
      next(error);
    }
  }

  // POST /api/productos
  async crear(req, res, next) {
    try {
      const nuevoProducto = await productosService.crear(req.body);
      res.status(201).json({
        ok: true,
        data: nuevoProducto,
        mensaje: 'Producto creado exitosamente'
      });
    } catch (error) {
      next(error);
    }
  }

  // PUT /api/productos/:id
  async actualizar(req, res, next) {
    try {
      const { id } = req.params;
      const productoActualizado = await productosService.actualizar(id, req.body);
      res.json({
        ok: true,
        data: productoActualizado,
        mensaje: 'Producto actualizado exitosamente'
      });
    } catch (error) {
      next(error);
    }
  }

  // DELETE /api/productos/:id
  async eliminar(req, res, next) {
    try {
      const { id } = req.params;
      const resultado = await productosService.eliminar(id);
      res.json({
        ok: true,
        mensaje: resultado.mensaje
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /api/productos/buscar/:nombre
  async buscarPorNombre(req, res, next) {
    try {
      const { nombre } = req.params;
      const productos = await productosService.buscarPorNombre(nombre);
      res.json({
        ok: true,
        data: productos
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /api/productos/tipo/:tipo
  async obtenerPorTipo(req, res, next) {
    try {
      const { tipo } = req.params;
      const productos = await productosService.obtenerPorTipo(tipo);
      res.json({
        ok: true,
        data: productos
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ProductosController();