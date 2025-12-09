import { pool } from "../db/pool.js";

export const getCompras = async (_, res) => {
  const { rows } = await pool.query("SELECT * FROM compras");
  res.json(rows);
};

export const createCompra = async (req, res) => {
  const { id_proveedor, total } = req.body;

  const { rows } = await pool.query(
    `INSERT INTO compras (id_proveedor, total)
     VALUES ($1,$2) RETURNING *`,
    [id_proveedor, total]
  );

  res.json(rows[0]);
};
