const oracledb = require("oracledb");
const db = require("../config/db");

module.exports = {

    listar: async () => {
        const conn = await db.getConnection();
        const result = await conn.execute(`
            SELECT 
                id_embarcacion,
                nombre,
                bandera,
                TO_CHAR(fecha_arribo, 'YYYY-MM-DD') AS fecha_arribo,
                TO_CHAR(fecha_salida, 'YYYY-MM-DD') AS fecha_salida
            FROM embarcaciones
            ORDER BY id_embarcacion
        `);

        return result.rows;
    },

    obtenerPorId: async (id) => {
        const conn = await db.getConnection();
        const result = await conn.execute(
            `SELECT 
                id_embarcacion,
                nombre,
                bandera,
                TO_CHAR(fecha_arribo, 'YYYY-MM-DD') AS fecha_arribo,
                TO_CHAR(fecha_salida, 'YYYY-MM-DD') AS fecha_salida
             FROM embarcaciones
             WHERE id_embarcacion = :id`,
            [id]
        );

        return result.rows.length ? result.rows[0] : null;
    },

    crear: async (data) => {
        const conn = await db.getConnection();
        const result = await conn.execute(
            `INSERT INTO embarcaciones (nombre, bandera, fecha_arribo, fecha_salida)
             VALUES (:nombre, :bandera, TO_DATE(:arribo, 'YYYY-MM-DD'), TO_DATE(:salida, 'YYYY-MM-DD'))
             RETURNING id_embarcacion INTO :id`,
            {
                nombre: data.nombre,
                bandera: data.bandera,
                arribo: data.fecha_arribo,
                salida: data.fecha_salida,
                id: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }
            }
        );

        await conn.commit();

        return {
            id_embarcacion: result.outBinds.id[0],
            ...data
        };
    },

    actualizar: async (id, data) => {
        const conn = await db.getConnection();
        await conn.execute(
            `UPDATE embarcaciones
             SET nombre = :nombre,
                 bandera = :bandera,
                 fecha_arribo = TO_DATE(:arribo, 'YYYY-MM-DD'),
                 fecha_salida = TO_DATE(:salida, 'YYYY-MM-DD')
             WHERE id_embarcacion = :id`,
            {
                id,
                nombre: data.nombre,
                bandera: data.bandera,
                arribo: data.fecha_arribo,
                salida: data.fecha_salida
            }
        );

        await conn.commit();

        return { id_embarcacion: id, ...data };
    },

    eliminar: async (id) => {
        const conn = await db.getConnection();
        await conn.execute(
            `DELETE FROM embarcaciones WHERE id_embarcacion = :id`,
            [id]
        );
        await conn.commit();
        return true;
    }
};
