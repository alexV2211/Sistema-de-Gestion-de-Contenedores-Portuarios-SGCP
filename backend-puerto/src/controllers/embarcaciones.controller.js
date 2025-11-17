const embarcacionesService = require("../services/embarcaciones.service");

module.exports = {

    listar: async (req, res) => {
        try {
            const data = await embarcacionesService.listar();
            res.json(data);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    obtenerPorId: async (req, res) => {
        try {
            const item = await embarcacionesService.obtenerPorId(req.params.id);

            if (!item) {
                return res.status(404).json({ message: "Embarcación no encontrada" });
            }

            res.json(item);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    crear: async (req, res) => {
        try {
            const nuevo = await embarcacionesService.crear(req.body);
            res.status(201).json(nuevo);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    actualizar: async (req, res) => {
        try {
            const actualizado = await embarcacionesService.actualizar(req.params.id, req.body);
            res.json(actualizado);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    eliminar: async (req, res) => {
        try {
            await embarcacionesService.eliminar(req.params.id);
            res.json({ message: "Embarcación eliminada" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

};
