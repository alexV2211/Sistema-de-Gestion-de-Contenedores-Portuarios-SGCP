import oracledb from "oracledb";
import dotenv from "dotenv";
dotenv.config();

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectString: process.env.DB_CONNECT,
};

export async function testConnection() {
  try {
    const conn = await oracledb.getConnection(dbConfig);
    console.log("✅ Conexión exitosa a Oracle");
    await conn.close();
  } catch (err) {
    console.error("❌ Error al conectar con Oracle:", err.message);
  }
}

export default dbConfig;