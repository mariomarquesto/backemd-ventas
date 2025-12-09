import { pool } from "../db/pool.js";

export const getEmpleados = async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM empleados");
  res.json(rows);
};

export const getEmpleadoById = async (req, res) => {
  const { id } = req.params;
  const { rows } = await pool.query("SELECT * FROM empleados WHERE id = $1", [id]);
  res.json(rows[0]);
};

export const createEmpleado = async (req, res) => {
  const { nombre, dni, telefono, email, id_seccion } = req.body;

  const { rows } = await pool.query(
    `INSERT INTO empleados (nombre, dni, telefono, email, id_seccion)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [nombre, dni, telefono, email, id_seccion]
  );

  res.json(rows[0]);
};

export const deleteEmpleado = async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM empleados WHERE id = $1", [id]);
  res.json({ message: "Empleado eliminado" });
};
