const express = require('express');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');

const contenedoresRoutes = require('./routes/contenedores.routes');
const reportesRoutes = require('./routes/reportes.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/contenedores', contenedoresRoutes);
app.use('/api/reportes', reportesRoutes);

app.get('/api/health', (req, res) => {
  res.json({ ok: true, message: 'Backend puerto operativo ✅' });
});

app.use(errorHandler);

module.exports = app;
