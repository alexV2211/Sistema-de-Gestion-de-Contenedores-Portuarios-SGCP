import oracledb from "oracledb";
import dotenv from "dotenv";
dotenv.config();

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectString: process.env.DB_CONNECT,
};

export async function generarReporte1(req, res) {
  let conn;
  try {
    conn = await oracledb.getConnection(dbConfig);
    // Aquí llamas a tu procedimiento almacenado PL/SQL
    await conn.execute(`BEGIN REP_CONTENEDORES_RETENIDOS; END;`);
    res.json({ mensaje: "Procedimiento ejecutado correctamente ✅" });
  } catch (err) {
    console.error("❌ Error al ejecutar el reporte:", err.message);
    res.status(500).json({ error: err.message });
  } finally {
    if (conn) {
      try {
        await conn.close();
      } catch (closeErr) {
        console.error("Error cerrando la conexión:", closeErr.message);
      }
    }
  }
}