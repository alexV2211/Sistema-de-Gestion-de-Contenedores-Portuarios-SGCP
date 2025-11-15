import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import reportesRoutes from "./routes/reportes.js";
import { testConnection } from "./config/db.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/reportes", reportesRoutes);

app.get("/", (req, res) => {
  res.send("Servidor backend funcionando correctamente 🚀");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Servidor corriendo en puerto http://localhost:${PORT}`);
  await testConnection(); // 👈 aquí se probará tu .env realmente
});