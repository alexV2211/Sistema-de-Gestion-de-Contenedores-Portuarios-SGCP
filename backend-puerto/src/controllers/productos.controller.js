const productosService = require("../services/productos.service");

module.exports = {

    listar: async (req, res) => {
        try {
            const data = await productosService.listar();
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    obtenerPorId: async (req, res) => {
        try {
            const item = await productosService.obtenerPorId(req.params.id);
            if (!item) {
                return res.status(404).json({ message: "Producto no encontrado" });
            }
            res.json(item);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    crear: async (req, res) => {
        try {
            const nuevo = await productosService.crear(req.body);
            res.status(201).json(nuevo);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    actualizar: async (req, res) => {
        try {
            const actualizado = await productosService.actualizar(req.params.id, req.body);
            res.json(actualizado);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    eliminar: async (req, res) => {
        try {
            await productosService.eliminar(req.params.id);
            res.json({ message: "Producto eliminado" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

};
