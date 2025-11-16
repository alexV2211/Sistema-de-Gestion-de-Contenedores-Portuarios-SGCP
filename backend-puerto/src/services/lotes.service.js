const oracledb = require("oracledb");
const db = require("../config/db");

module.exports = {

    listar: async () => {
        const conn = await db.getConnection();
        const result = await conn.execute(
            `SELECT * FROM lotes ORDER BY id_lote`
        );
        return result.rows;
    },

    obtenerPorId: async (id) => {
        const conn = await db.getConnection();
        const result = await conn.execute(
            `SELECT * FROM lotes WHERE id_lote = :id`,
            [id]
        );
        return result.rows.length ? result.rows[0] : null;
    },

    crear: async (data) => {
        const conn = await db.getConnection();
        const result = await conn.execute(
            `INSERT INTO lotes (id_contenedor, id_producto, cantidad)
             VALUES (:contenedor, :producto, :cantidad)
             RETURNING id_lote INTO :id`,
            {
                contenedor: data.id_contenedor,
                producto: data.id_producto,
                cantidad: data.cantidad ?? 1,
                id: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }
            }
        );
        await conn.commit();

        return {
            id_lote: result.outBinds.id[0],
            ...data
        };
    },

    actualizar: async (id, data) => {
        const conn = await db.getConnection();
        await conn.execute(
            `UPDATE lotes
             SET id_contenedor = :contenedor,
                 id_producto = :producto,
                 cantidad = :cantidad
             WHERE id_lote = :id`,
            {
                id,
                contenedor: data.id_contenedor,
                producto: data.id_producto,
                cantidad: data.cantidad
            }
        );
        await conn.commit();

        return { id_lote: id, ...data };
    },

    eliminar: async (id) => {
        const conn = await db.getConnection();
        await conn.execute(
            `DELETE FROM lotes WHERE id_lote = :id`,
            [id]
        );
        await conn.commit();

        return true;
    }

};
