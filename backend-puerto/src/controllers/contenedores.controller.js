const contenedoresService = require("../services/contenedores.service");

module.exports = {

    listar: async (req, res) => {
        try {
            const data = await contenedoresService.listar();
            res.json({ ok: true, data });
        } catch (error) {
            res.status(500).json({ ok: false, message: error.message });
        }
    },

    obtenerPorId: async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const data = await contenedoresService.obtenerPorId(id);

            if (!data) {
                return res.status(404).json({ ok: false, message: "Contenedor no encontrado" });
            }

            res.json({ ok: true, data });
        } catch (error) {
            res.status(500).json({ ok: false, message: error.message });
        }
    },

    crear: async (req, res) => {
        try {
            const nuevo = await contenedoresService.crear(req.body);
            res.json({ ok: true, message: "Contenedor creado", data: nuevo });
        } catch (error) {
            res.status(500).json({ ok: false, message: error.message });
        }
    },

    actualizar: async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const actualizado = await contenedoresService.actualizar(id, req.body);
            res.json({ ok: true, message: "Contenedor actualizado", data: actualizado });
        } catch (error) {
            res.status(500).json({ ok: false, message: error.message });
        }
    },

    eliminar: async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            await contenedoresService.eliminar(id);
            res.json({ ok: true, message: "Contenedor eliminado" });
        } catch (error) {
            res.status(500).json({ ok: false, message: error.message });
        }
    }
};
