const clientesService = require("../services/clientes.service");

module.exports = {

    listar: async (req, res) => {
        try {
            const data = await clientesService.listar();
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    obtenerPorId: async (req, res) => {
        try {
            const cliente = await clientesService.obtenerPorId(req.params.id);
            if (!cliente) {
                return res.status(404).json({ message: "Cliente no encontrado" });
            }
            res.json(cliente);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    crear: async (req, res) => {
        try {
            const nuevo = await clientesService.crear(req.body);
            res.status(201).json(nuevo);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    actualizar: async (req, res) => {
        try {
            const actualizado = await clientesService.actualizar(req.params.id, req.body);
            res.json(actualizado);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    eliminar: async (req, res) => {
        try {
            await clientesService.eliminar(req.params.id);
            res.json({ message: "Cliente eliminado" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

};
