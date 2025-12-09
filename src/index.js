import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { initDB } from "./db/initDB.js";

// Rutas
import clientesRoutes from "./routes/clientes.routes.js";
import productosRoutes from "./routes/productos.routes.js";
import proveedoresRoutes from "./routes/proveedores.routes.js";
import empleadosRoutes from "./routes/empleados.routes.js";
import ventasRoutes from "./routes/ventas.routes.js";
import comprasRoutes from "./routes/compras.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Health check
app.get("/", (_req, res) => {
  res.json({ status: "OK", message: "API Ventas funcionando 🚀" });
});

async function startServer() {
  try {
    await initDB();
    console.log("✅ Base de datos inicializada correctamente");

    // Rutas
    app.use("/api/clientes", clientesRoutes);
    app.use("/api/productos", productosRoutes);
    app.use("/api/proveedores", proveedoresRoutes);
    app.use("/api/empleados", empleadosRoutes);
    app.use("/api/ventas", ventasRoutes);
    app.use("/api/compras", comprasRoutes);

    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error al iniciar el servidor:", error);
    process.exit(1);
  }
}

startServer();

export default app;
