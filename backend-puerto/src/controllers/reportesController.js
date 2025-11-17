const db = require('../config/db');

// Función genérica para reportes SIN parámetros
async function reporteGenerico(req, res, next, nombreSP) {
  let connection;
  try {
    connection = await db.getConnection();
    const result = await connection.execute(
      `BEGIN ${nombreSP}(:cursor_out); END;`,
      { cursor_out: { dir: db.oracledb.BIND_OUT, type: db.oracledb.CURSOR } }
    );

    const cursor = result.outBinds.cursor_out;
    const rows = await cursor.getRows();
    await cursor.close();

    res.json({
      ok: true,
      data: rows
    });
  } catch (err) {
    next(err);
  } finally {
    if (connection) await connection.close();
  }
}

// Función genérica para reportes CON parámetros
async function reporteConParametros(req, res, next, nombreSP, binds) {
  let connection;
  try {
    connection = await db.getConnection();
    const result = await connection.execute(
      `BEGIN ${nombreSP}; END;`,
      binds
    );

    const cursor = result.outBinds.cursor_out;
    const rows = await cursor.getRows();
    await cursor.close();

    res.json({
      ok: true,
      data: rows
    });
  } catch (err) {
    next(err);
  } finally {
    if (connection) await connection.close();
  }
}

// Reportes sin parámetros
async function reporte1(req, res, next) {
  reporteGenerico(req, res, next, 'rep_contenedores_activos');
}

async function reporte2(req, res, next) {
  reporteGenerico(req, res, next, 'rep_ranking_clientes');
}

// Reporte 3: CON parámetro "dias"
async function reporte3(req, res, next) {
  const dias = parseInt(req.query.dias) || 7; // Default: 7 días
  
  const binds = {
    dias: dias,
    cursor_out: { dir: db.oracledb.BIND_OUT, type: db.oracledb.CURSOR }
  };
  
  reporteConParametros(req, res, next, 'rep_contenedores_proxima_salida(:dias, :cursor_out)', binds);
}

async function reporte4(req, res, next) {
  reporteGenerico(req, res, next, 'rep_productos_mensuales');
}

// Reporte 5: CON parámetro "id"
async function reporte5(req, res, next) {
  const id = parseInt(req.params.id);
  
  if (!id || isNaN(id)) {
    return res.status(400).json({
      ok: false,
      message: 'Se requiere un ID de contenedor válido'
    });
  }
  
  const binds = {
    id: id,
    cursor_out: { dir: db.oracledb.BIND_OUT, type: db.oracledb.CURSOR }
  };
  
  reporteConParametros(req, res, next, 'rep_historial_contenedor(:id, :cursor_out)', binds);
}

async function reporte6(req, res, next) {
  reporteGenerico(req, res, next, 'rep_embarcaciones_contenedores');
}

async function reporte7(req, res, next) {
  reporteGenerico(req, res, next, 'rep_estado_puerto');
}

async function reporte8(req, res, next) {
  reporteGenerico(req, res, next, 'rep_contenedores_abandonados');
}

async function reporte9(req, res, next) {
  reporteGenerico(req, res, next, 'rep_alertas_detalle');
}

async function reporte10(req, res, next) {
  reporteGenerico(req, res, next, 'rep_auditoria_usuarios');
}

module.exports = {
  reporte1,
  reporte2,
  reporte3,
  reporte4,
  reporte5,
  reporte6,
  reporte7,
  reporte8,
  reporte9,
  reporte10
};
