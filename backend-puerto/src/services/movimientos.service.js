const oracledb = require("oracledb");
const db = require("../config/db");

module.exports = {

    listar: async () => {
        const conn = await db.getConnection();
        const result = await conn.execute(
            `SELECT * FROM movimientos ORDER BY id_movimiento`
        );
        return result.rows;
    },

    obtenerPorId: async (id) => {
        const conn = await db.getConnection();
        const result = await conn.execute(
            `SELECT * FROM movimientos WHERE id_movimiento = :id`,
            [id]
        );
        return result.rows.length ? result.rows[0] : null;
    },

    crear: async (data) => {
        const conn = await db.getConnection();
        const result = await conn.execute(
            `INSERT INTO movimientos (id_contenedor, tipo_movimiento, observaciones)
             VALUES (:contenedor, :tipo, :obs)
             RETURNING id_movimiento INTO :id`,
            {
                contenedor: data.id_contenedor,
                tipo: data.tipo_movimiento,
                obs: data.observaciones,
                id: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }
            }
        );
        await conn.commit();
        return { id_movimiento: result.outBinds.id[0], ...data };
    },

    actualizar: async (id, data) => {
        const conn = await db.getConnection();
        await conn.execute(
            `UPDATE movimientos
             SET id_contenedor = :contenedor,
                 tipo_movimiento = :tipo,
                 observaciones = :obs
             WHERE id_movimiento = :id`,
            {
                id,
                contenedor: data.id_contenedor,
                tipo: data.tipo_movimiento,
                obs: data.observaciones
            }
        );
        await conn.commit();
        return { id_movimiento: id, ...data };
    },

    eliminar: async (id) => {
        const conn = await db.getConnection();
        await conn.execute(
            `DELETE FROM movimientos WHERE id_movimiento = :id`,
            [id]
        );
        await conn.commit();
        return true;
    }
};
