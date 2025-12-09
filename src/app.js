import express from "express";
import cors from "cors";

import empleadosRoutes from "./routes/empleados.routes.js";
import clientesRoutes from "./routes/clientes.routes.js";
import proveedoresRoutes from "./routes/proveedores.routes.js";
import productosRoutes from "./routes/productos.routes.js";
import ventasRoutes from "./routes/ventas.routes.js";
import comprasRoutes from "./routes/compras.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/empleados", empleadosRoutes);
app.use("/clientes", clientesRoutes);
app.use("/proveedores", proveedoresRoutes);
app.use("/productos", productosRoutes);
app.use("/ventas", ventasRoutes);
app.use("/compras", comprasRoutes);

export default app;
