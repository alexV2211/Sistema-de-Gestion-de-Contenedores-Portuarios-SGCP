const lotesService = require("../services/lotes.service");

module.exports = {

    listar: async (req, res) => {
        try {
            const data = await lotesService.listar();
            res.json(data);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    obtenerPorId: async (req, res) => {
        try {
            const lote = await lotesService.obtenerPorId(req.params.id);

            if (!lote) {
                return res.status(404).json({ message: "Lote no encontrado" });
            }

            res.json(lote);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    crear: async (req, res) => {
        try {
            const nuevo = await lotesService.crear(req.body);
            res.status(201).json(nuevo);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    actualizar: async (req, res) => {
        try {
            const actualizado = await lotesService.actualizar(req.params.id, req.body);
            res.json(actualizado);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    eliminar: async (req, res) => {
        try {
            await lotesService.eliminar(req.params.id);
            res.json({ message: "Lote eliminado" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

};
