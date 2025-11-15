require('dotenv').config();

console.log("ENV:", process.env.DB_PASSWORD);

const app = require('./app');
const db = require('./config/db');

const PORT = process.env.PORT || 4000;

async function start() {
  try {
    await db.init();

    app.listen(PORT, () => {
      console.log(`🚢 Backend puerto escuchando en http://localhost:${PORT}`);
    });

    process.on('SIGINT', async () => {
      console.log('\nRecibida señal SIGINT, cerrando...');
      await db.close();
      process.exit(0);
    });
  } catch (err) {
    console.error('❌ No se pudo iniciar el servidor:', err);
    process.exit(1);
  }
}

start();