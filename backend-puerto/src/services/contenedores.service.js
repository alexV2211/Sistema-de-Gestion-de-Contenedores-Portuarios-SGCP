const oracledb = require("oracledb");
const db = require("../config/db");

module.exports = {

    listar: async () => {
        const conn = await db.getConnection();
        const result = await conn.execute(
            `SELECT * FROM contenedores ORDER BY id_contenedor`
        );
        return result.rows;
    },

    obtenerPorId: async (id) => {
        const conn = await db.getConnection();
        const result = await conn.execute(
            `SELECT * FROM contenedores WHERE id_contenedor = :id`,
            [id]
        );
        return result.rows.length ? result.rows[0] : null;
    },

    crear: async (data) => {
        const conn = await db.getConnection();
        const result = await conn.execute(
            `INSERT INTO contenedores (codigo_contenedor, tipo, estado, peso, id_cliente, id_embarcacion)
             VALUES (:codigo, :tipo, :estado, :peso, :cliente, :emb)
             RETURNING id_contenedor INTO :id`,
            {
                codigo: data.codigo_contenedor,
                tipo: data.tipo,
                estado: data.estado,
                peso: data.peso,
                cliente: data.id_cliente,
                emb: data.id_embarcacion,
                id: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }
            }
        );
        await conn.commit();
        return { id_contenedor: result.outBinds.id[0], ...data };
    },

    actualizar: async (id, data) => {
        const conn = await db.getConnection();
        const result = await conn.execute(
            `UPDATE contenedores
             SET codigo_contenedor = :codigo,
                 tipo = :tipo,
                 estado = :estado,
                 peso = :peso,
                 id_cliente = :cliente,
                 id_embarcacion = :emb
             WHERE id_contenedor = :id`,
            {
                id,
                codigo: data.codigo_contenedor,
                tipo: data.tipo,
                estado: data.estado,
                peso: data.peso,
                cliente: data.id_cliente,
                emb: data.id_embarcacion
            }
        );
        await conn.commit();
        return { id_contenedor: id, ...data };
    },

    eliminar: async (id) => {
        const conn = await db.getConnection();
        await conn.execute(
            `DELETE FROM contenedores WHERE id_contenedor = :id`,
            [id]
        );
        await conn.commit();
        return true;
    }
};
