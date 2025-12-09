import { pool } from "../db/pool.js";

// Obtener todas las ventas
export const getVentas = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM ventas ORDER BY id DESC");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear una venta
export const createVenta = async (req, res) => {
  try {
    const { id_cliente, total } = req.body;

    const result = await pool.query(
      "INSERT INTO ventas (id_cliente, total) VALUES ($1, $2) RETURNING *",
      [id_cliente, total]
    );

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
