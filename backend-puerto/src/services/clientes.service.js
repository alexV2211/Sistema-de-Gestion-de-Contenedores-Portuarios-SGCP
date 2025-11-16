const oracledb = require("oracledb");
const db = require("../config/db");

module.exports = {

    listar: async () => {
        const conn = await db.getConnection();
        const result = await conn.execute(
            `SELECT * FROM clientes ORDER BY id_cliente`
        );
        return result.rows;
    },

    obtenerPorId: async (id) => {
        const conn = await db.getConnection();
        const result = await conn.execute(
            `SELECT * FROM clientes WHERE id_cliente = :id`,
            [id]
        );
        return result.rows.length ? result.rows[0] : null;
    },

    crear: async (data) => {
        const conn = await db.getConnection();
        const result = await conn.execute(
            `INSERT INTO clientes (nombre_empresa, representante, contacto)
             VALUES (:empresa, :representante, :contacto)
             RETURNING id_cliente INTO :id`,
            {
                empresa: data.nombre_empresa,
                representante: data.representante,
                contacto: data.contacto,
                id: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }
            }
        );
        await conn.commit();
        return { id_cliente: result.outBinds.id[0], ...data };
    },

    actualizar: async (id, data) => {
        const conn = await db.getConnection();
        await conn.execute(
            `UPDATE clientes
             SET nombre_empresa = :empresa,
                 representante = :representante,
                 contacto = :contacto
             WHERE id_cliente = :id`,
            {
                id,
                empresa: data.nombre_empresa,
                representante: data.representante,
                contacto: data.contacto
            }
        );
        await conn.commit();
        return { id_cliente: id, ...data };
    },

    eliminar: async (id) => {
        const conn = await db.getConnection();
        await conn.execute(
            `DELETE FROM clientes WHERE id_cliente = :id`,
            [id]
        );
        await conn.commit();
        return true;
    }
};
