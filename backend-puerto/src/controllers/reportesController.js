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

// ============================================================
// REPORTE 1: Contenedores activos con su último movimiento
// ============================================================
async function contenedoresActivos(req, res, next) {
  reporteGenerico(req, res, next, 'rep_contenedores_activos');
}

// ============================================================
// REPORTE 2: Ranking de clientes según cantidad de contenedores
// ============================================================
async function rankingClientes(req, res, next) {
  reporteGenerico(req, res, next, 'rep_ranking_clientes');
}

// ============================================================
// REPORTE 3: Contenedores que saldrán en X días (CON PARÁMETRO)
// ============================================================
async function contenedoresProximaSalida(req, res, next) {
  const dias = parseInt(req.query.dias) || 7; // Default: 7 días
  
  const binds = {
    dias: dias,
    cursor_out: { dir: db.oracledb.BIND_OUT, type: db.oracledb.CURSOR }
  };
  
  reporteConParametros(req, res, next, 'rep_contenedores_proxima_salida(:dias, :cursor_out)', binds);
}

// ============================================================
// REPORTE 4: Productos más enviados del mes actual
// ============================================================
async function productosMensuales(req, res, next) {
  reporteGenerico(req, res, next, 'rep_productos_mensuales');
}

// ============================================================
// REPORTE 5: Historial completo de un contenedor (CON PARÁMETRO)
// ============================================================
async function historialContenedor(req, res, next) {
  const id = parseInt(req.params.id);
  
  // Validar que el ID sea válido
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

// ============================================================
// REPORTE 6: Embarcaciones con mayor cantidad de contenedores
// ============================================================
async function embarcacionesContenedores(req, res, next) {
  reporteGenerico(req, res, next, 'rep_embarcaciones_contenedores');
}

// ============================================================
// REPORTE 7: Resumen del estado general del puerto
// ============================================================
async function estadoPuerto(req, res, next) {
  reporteGenerico(req, res, next, 'rep_estado_puerto');
}

// ============================================================
// REPORTE 8: Contenedores sin movimientos (posibles abandonados)
// ============================================================
async function contenedoresAbandonados(req, res, next) {
  reporteGenerico(req, res, next, 'rep_contenedores_abandonados');
}

// ============================================================
// REPORTE 9: Alertas activas con detalle completo
// ============================================================
async function alertasDetalle(req, res, next) {
  reporteGenerico(req, res, next, 'rep_alertas_detalle');
}

// ============================================================
// REPORTE 10: Auditoría de usuarios (acciones por día)
// ============================================================
async function auditoriaUsuarios(req, res, next) {
  reporteGenerico(req, res, next, 'rep_auditoria_usuarios');
}

module.exports = {
  contenedoresActivos,
  rankingClientes,
  contenedoresProximaSalida,
  productosMensuales,
  historialContenedor,
  embarcacionesContenedores,
  estadoPuerto,
  contenedoresAbandonados,
  alertasDetalle,
  auditoriaUsuarios
};