const oracledb = require("oracledb");
const db = require("../config/db");

module.exports = {

    listar: async () => {
        const conn = await db.getConnection();
        const result = await conn.execute(
            `SELECT * FROM productos ORDER BY id_producto`
        );
        return result.rows;
    },

    obtenerPorId: async (id) => {
        const conn = await db.getConnection();
        const result = await conn.execute(
            `SELECT * FROM productos WHERE id_producto = :id`,
            [id]
        );
        return result.rows.length ? result.rows[0] : null;
    },

    crear: async (data) => {
        const conn = await db.getConnection();
        const result = await conn.execute(
            `INSERT INTO productos (nombre, descripcion, tipo_producto, valor_estimado)
             VALUES (:nombre, :descripcion, :tipo, :valor)
             RETURNING id_producto INTO :id`,
            {
                nombre: data.nombre,
                descripcion: data.descripcion,
                tipo: data.tipo_producto,
                valor: data.valor_estimado,
                id: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }
            }
        );
        await conn.commit();
        return { id_producto: result.outBinds.id[0], ...data };
    },

    actualizar: async (id, data) => {
        const conn = await db.getConnection();
        await conn.execute(
            `UPDATE productos
             SET nombre = :nombre,
                 descripcion = :descripcion,
                 tipo_producto = :tipo,
                 valor_estimado = :valor
             WHERE id_producto = :id`,
            {
                id,
                nombre: data.nombre,
                descripcion: data.descripcion,
                tipo: data.tipo_producto,
                valor: data.valor_estimado
            }
        );
        await conn.commit();
        return { id_producto: id, ...data };
    },

    eliminar: async (id) => {
        const conn = await db.getConnection();
        await conn.execute(
            `DELETE FROM productos WHERE id_producto = :id`,
            [id]
        );
        await conn.commit();
        return true;
    }
};
