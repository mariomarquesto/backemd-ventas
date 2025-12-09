import { pool } from "../db/pool.js";

export const createTables = async () => {
  await pool.query(`

  CREATE TABLE IF NOT EXISTS secciones (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) UNIQUE NOT NULL
  );

  INSERT INTO secciones (nombre) VALUES
  ('Galletas'),
  ('Impresiones 3D'),
  ('Servicio de Catering')
  ON CONFLICT DO NOTHING;

  CREATE TABLE IF NOT EXISTS empleados (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    dni VARCHAR(20) UNIQUE NOT NULL,
    telefono VARCHAR(30),
    email VARCHAR(100),
    id_seccion INT REFERENCES secciones(id),
    fecha_ingreso DATE DEFAULT CURRENT_DATE
  );

  CREATE TABLE IF NOT EXISTS clientes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    telefono VARCHAR(30),
    direccion VARCHAR(200),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS proveedores (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    telefono VARCHAR(30),
    email VARCHAR(100),
    direccion VARCHAR(200)
  );

  CREATE TABLE IF NOT EXISTS categorias_productos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) UNIQUE NOT NULL
  );

  INSERT INTO categorias_productos (nombre) VALUES
  ('Galletas'),
  ('Impresiones 3D'),
  ('Catering')
  ON CONFLICT DO NOTHING;

  CREATE TABLE IF NOT EXISTS productos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    stock INT DEFAULT 0,
    id_categoria INT REFERENCES categorias_productos(id)
  );

  CREATE TABLE IF NOT EXISTS ventas (
    id SERIAL PRIMARY KEY,
    id_cliente INT REFERENCES clientes(id),
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total DECIMAL(10,2)
  );

  CREATE TABLE IF NOT EXISTS detalle_ventas (
    id SERIAL PRIMARY KEY,
    id_venta INT REFERENCES ventas(id),
    id_producto INT REFERENCES productos(id),
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10,2) NOT NULL
  );

  CREATE TABLE IF NOT EXISTS compras (
    id SERIAL PRIMARY KEY,
    id_proveedor INT REFERENCES proveedores(id),
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total DECIMAL(10,2)
  );

  CREATE TABLE IF NOT EXISTS detalle_compras (
    id SERIAL PRIMARY KEY,
    id_compra INT REFERENCES compras(id),
    id_producto INT REFERENCES productos(id),
    cantidad INT NOT NULL,
    costo_unitario DECIMAL(10,2) NOT NULL
  );

  `);

  console.log("✔ Tablas creadas/verificadas");
};
