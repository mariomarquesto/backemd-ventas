import { pool } from "./pool.js";

export async function initDB() {
  // ==========================
  // TABLA SECCIONES
  // ==========================
  await pool.query(`
    CREATE TABLE IF NOT EXISTS secciones (
      id SERIAL PRIMARY KEY,
      nombre VARCHAR(100) UNIQUE NOT NULL
    );
  `);

  // ==========================
  // TABLA EMPLEADOS
  // ==========================
  await pool.query(`
    CREATE TABLE IF NOT EXISTS empleados (
      id SERIAL PRIMARY KEY,
      nombre VARCHAR(100),
      correo VARCHAR(100),
      telefono VARCHAR(50)
    );
  `);

  // ==========================
  // TABLA VENTAS
  // ==========================
  await pool.query(`
    CREATE TABLE IF NOT EXISTS ventas (
      id SERIAL PRIMARY KEY,
      descripcion VARCHAR(100),
      monto NUMERIC(10,2),
      fecha TIMESTAMP DEFAULT NOW()
    );
  `);

  // ==========================
  // TABLA COMPRAS
  // ==========================
  await pool.query(`
    CREATE TABLE IF NOT EXISTS compras (
      id SERIAL PRIMARY KEY,
      detalle VARCHAR(100),
      costo NUMERIC(10,2),
      fecha TIMESTAMP DEFAULT NOW()
    );
  `);

  // ==========================
  // TABLA PROVEEDORES
  // ==========================
  await pool.query(`
    CREATE TABLE IF NOT EXISTS proveedores (
      id SERIAL PRIMARY KEY,
      nombre VARCHAR(100) NOT NULL,
      telefono VARCHAR(50),
      correo VARCHAR(100)
    );
  `);

  // ==========================
  // TABLA PRODUCTOS
  // ==========================
  await pool.query(`
    CREATE TABLE IF NOT EXISTS productos (
      id SERIAL PRIMARY KEY,
      nombre VARCHAR(100) NOT NULL,
      precio NUMERIC(10,2) NOT NULL,
      stock INTEGER DEFAULT 0,
      id_seccion INTEGER REFERENCES secciones(id),
      id_proveedor INTEGER REFERENCES proveedores(id)
    );
  `);

  // ==========================
  // TABLA CLIENTES
  // ==========================
  await pool.query(`
    CREATE TABLE IF NOT EXISTS clientes (
      id SERIAL PRIMARY KEY,
      nombre VARCHAR(100) NOT NULL,
      telefono VARCHAR(50),
      correo VARCHAR(100)
    );
  `);

  // ======================================================
  // RELACIÓN CLIENTES - VENDEDORES (muchos a muchos)
  // ======================================================
  await pool.query(`
    CREATE TABLE IF NOT EXISTS clientes_vendedores (
      id SERIAL PRIMARY KEY,
      cliente_id INTEGER REFERENCES clientes(id),
      vendedor_id INTEGER REFERENCES empleados(id)
    );
  `);

  // ======================================================
  // RELACIÓN CLIENTES - PRODUCTOS (muchos a muchos)
  // ======================================================
  await pool.query(`
    CREATE TABLE IF NOT EXISTS clientes_productos (
      id SERIAL PRIMARY KEY,
      cliente_id INTEGER REFERENCES clientes(id),
      producto_id INTEGER REFERENCES productos(id)
    );
  `);

  console.log("✔ Todas las tablas creadas/verificadas correctamente");
}

initDB().catch((err) =>
  console.error("❌ Error al inicializar la base de datos:", err)
);
