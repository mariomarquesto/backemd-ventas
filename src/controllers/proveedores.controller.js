import { pool } from "../db/pool.js";

export const getProveedores = async (_, res) => {
  const { rows } = await pool.query("SELECT * FROM proveedores");
  res.json(rows);
};

export const createProveedor = async (req, res) => {
  const { nombre, telefono, email, direccion } = req.body;

  const { rows } = await pool.query(
    `INSERT INTO proveedores (nombre, telefono, email, direccion)
     VALUES ($1,$2,$3,$4) RETURNING *`,
    [nombre, telefono, email, direccion]
  );

  res.json(rows[0]);
};
