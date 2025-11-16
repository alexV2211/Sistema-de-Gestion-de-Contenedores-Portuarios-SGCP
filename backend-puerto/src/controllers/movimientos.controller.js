const movimientosService = require("../services/movimientos.service");

module.exports = {

    listar: async (req, res) => {
        try {
            const data = await movimientosService.listar();
            res.json(data);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    obtenerPorId: async (req, res) => {
        try {
            const data = await movimientosService.obtenerPorId(req.params.id);
            if (!data) {
                return res.status(404).json({ mensaje: "Movimiento no encontrado" });
            }
            res.json(data);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    crear: async (req, res) => {
        try {
            const nuevo = await movimientosService.crear(req.body);
            res.status(201).json(nuevo);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    actualizar: async (req, res) => {
        try {
            const actualizado = await movimientosService.actualizar(req.params.id, req.body);
            res.json(actualizado);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    eliminar: async (req, res) => {
        try {
            await movimientosService.eliminar(req.params.id);
            res.json({ mensaje: "Movimiento eliminado" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};
