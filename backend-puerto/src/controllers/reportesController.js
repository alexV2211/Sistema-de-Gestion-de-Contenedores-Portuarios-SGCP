const db = require('../config/db');

async function reporteGenerico(req, res, next, nombreSP) {
  let connection;
  try {
    connection = await db.getConnection();
    const result = await connection.execute(
      `BEGIN ${nombreSP}(:cursor_out); END;`,
      { cursor_out: { dir: db.oracledb.BIND_OUT, type: db.oracledb.CURSOR } }
    );

    const cursor = result.outBinds.cursor_out;
    const rows = await cursor.getRows(); // todos los registros
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

async function reporte1(req, res, next) { reporteGenerico(req, res, next, 'REP_REPORTE_1'); }
async function reporte2(req, res, next) { reporteGenerico(req, res, next, 'REP_REPORTE_2'); }
async function reporte3(req, res, next) { reporteGenerico(req, res, next, 'REP_REPORTE_3'); }
async function reporte4(req, res, next) { reporteGenerico(req, res, next, 'REP_REPORTE_4'); }
async function reporte5(req, res, next) { reporteGenerico(req, res, next, 'REP_REPORTE_5'); }
async function reporte6(req, res, next) { reporteGenerico(req, res, next, 'REP_REPORTE_6'); }
async function reporte7(req, res, next) { reporteGenerico(req, res, next, 'REP_REPORTE_7'); }
async function reporte8(req, res, next) { reporteGenerico(req, res, next, 'REP_REPORTE_8'); }
async function reporte9(req, res, next) { reporteGenerico(req, res, next, 'REP_REPORTE_9'); }
async function reporte10(req, res, next) { reporteGenerico(req, res, next, 'REP_REPORTE_10'); }

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