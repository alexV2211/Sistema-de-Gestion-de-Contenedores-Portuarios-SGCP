const express = require('express');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');

const contenedoresRoutes = require("./routes/contenedores.routes");
const movimientosRoutes = require("./routes/movimientos.routes");
const clientesRoutes = require("./routes/clientes.routes");
const productosRoutes = require("./routes/productos.routes");
const lotesRoutes = require("./routes/lotes.routes");
const embarcacionesRoutes = require("./routes/embarcaciones.routes")
const usuariosRoutes = require("./routes/usuarios.routes");

const reportesRoutes = require('./routes/reportes.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/contenedores", contenedoresRoutes);
app.use("/api/movimientos", movimientosRoutes);
app.use("/api/clientes", clientesRoutes);
app.use("/api/productos", productosRoutes);
app.use("/api/lotes", lotesRoutes);
app.use("/api/embarcaciones", embarcacionesRoutes);
app.use("/api/usuarios", usuariosRoutes);

app.use('/api/reportes', reportesRoutes);

app.get('/api/health', (req, res) => {
  res.json({ ok: true, message: 'Backend puerto operativo ✅' });
});

app.use(errorHandler);

module.exports = app;
