// src/controllers/contenedorController.js
const db = require('../config/db');

// GET /api/contenedores
async function listarContenedores(req, res, next) {
  let connection;
  try {
    connection = await db.getConnection();
    const result = await connection.execute(
      `SELECT 
         id_contenedor,
         codigo_contenedor,
         origen,
         destino,
         estado,
         fecha_ingreso,
         fecha_salida_estimada
       FROM contenedores
       ORDER BY fecha_ingreso DESC`
    );

    res.json({
      ok: true,
      data: result.rows
    });
  } catch (err) {
    next(err);
  } finally {
    if (connection) await connection.close();
  }
}

// GET /api/contenedores/:id
async function obtenerContenedorPorId(req, res, next) {
  let connection;
  const { id } = req.params;

  try {
    connection = await db.getConnection();
    const result = await connection.execute(
      `SELECT 
         id_contenedor,
         codigo_contenedor,
         origen,
         destino,
         estado,
         fecha_ingreso,
         fecha_salida_estimada
       FROM contenedores
       WHERE id_contenedor = :id`,
      { id: Number(id) }
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        ok: false,
        message: 'Contenedor no encontrado'
      });
    }

    res.json({
      ok: true,
      data: result.rows[0]
    });
  } catch (err) {
    next(err);
  } finally {
    if (connection) await connection.close();
  }
}

// POST /api/contenedores
async function crearContenedor(req, res, next) {
  let connection;
  const {
    codigo_contenedor,
    origen,
    destino,
    estado,
    fecha_ingreso,
    fecha_salida_estimada
  } = req.body;

  if (!codigo_contenedor || !origen || !destino) {
    return res.status(400).json({
      ok: false,
      message: 'codigo_contenedor, origen y destino son obligatorios'
    });
  }

  try {
    connection = await db.getConnection();

    const result = await connection.execute(
      `INSERT INTO contenedores (
         id_contenedor,
         codigo_contenedor,
         origen,
         destino,
         estado,
         fecha_ingreso,
         fecha_salida_estimada
       ) VALUES (
         SEQ_CONTENEDOR.NEXTVAL,
         :codigo_contenedor,
         :origen,
         :destino,
         :estado,
         TO_DATE(:fecha_ingreso,'YYYY-MM-DD'),
         TO_DATE(:fecha_salida_estimada,'YYYY-MM-DD')
       )
       RETURNING id_contenedor INTO :id_out`,
      {
        codigo_contenedor,
        origen,
        destino,
        estado: estado || 'EN_PUERTO',
        fecha_ingreso,
        fecha_salida_estimada,
        id_out: { dir: db.oracledb.BIND_OUT, type: db.oracledb.NUMBER }
      },
      { autoCommit: true }
    );

    const newId = result.outBinds.id_out[0];

    res.status(201).json({
      ok: true,
      message: 'Contenedor creado correctamente',
      id_contenedor: newId
    });
  } catch (err) {
    next(err);
  } finally {
    if (connection) await connection.close();
  }
}

// PUT /api/contenedores/:id
async function actualizarContenedor(req, res, next) {
  let connection;
  const { id } = req.params;
  const {
    codigo_contenedor,
    origen,
    destino,
    estado,
    fecha_ingreso,
    fecha_salida_estimada
  } = req.body;

  try {
    connection = await db.getConnection();

    const result = await connection.execute(
      `UPDATE contenedores
       SET
         codigo_contenedor   = NVL(:codigo_contenedor, codigo_contenedor),
         origen              = NVL(:origen, origen),
         destino             = NVL(:destino, destino),
         estado              = NVL(:estado, estado),
         fecha_ingreso       = COALESCE(TO_DATE(:fecha_ingreso,'YYYY-MM-DD'), fecha_ingreso),
         fecha_salida_estimada = COALESCE(TO_DATE(:fecha_salida_estimada,'YYYY-MM-DD'), fecha_salida_estimada)
       WHERE id_contenedor = :id`,
      {
        id: Number(id),
        codigo_contenedor,
        origen,
        destino,
        estado,
        fecha_ingreso,
        fecha_salida_estimada
      },
      { autoCommit: true }
    );

    if (result.rowsAffected === 0) {
      return res.status(404).json({
        ok: false,
        message: 'Contenedor no encontrado para actualizar'
      });
    }

    res.json({
      ok: true,
      message: 'Contenedor actualizado correctamente'
    });
  } catch (err) {
    next(err);
  } finally {
    if (connection) await connection.close();
  }
}

// DELETE /api/contenedores/:id
async function eliminarContenedor(req, res, next) {
  let connection;
  const { id } = req.params;

  try {
    connection = await db.getConnection();

    const result = await connection.execute(
      `DELETE FROM contenedores WHERE id_contenedor = :id`,
      { id: Number(id) },
      { autoCommit: true }
    );

    if (result.rowsAffected === 0) {
      return res.status(404).json({
        ok: false,
        message: 'Contenedor no encontrado para eliminar'
      });
    }

    res.json({
      ok: true,
      message: 'Contenedor eliminado correctamente'
    });
  } catch (err) {
    next(err);
  } finally {
    if (connection) await connection.close();
  }
}

module.exports = {
  listarContenedores,
  obtenerContenedorPorId,
  crearContenedor,
  actualizarContenedor,
  eliminarContenedor
};
