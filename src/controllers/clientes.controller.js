import { pool } from "../db/pool.js";

// ✅ Obtener todos los clientes
export const getClientes = async (_req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM clientes ORDER BY id");
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener clientes:", error);
    res.status(500).json({ error: "Error al obtener clientes" });
  }
};

// ✅ Crear cliente
export const createCliente = async (req, res) => {
  try {
    const { nombre, telefono, correo } = req.body;

    // Validaciones
    if (!nombre || !telefono) {
      return res.status(400).json({ error: "Nombre y teléfono son obligatorios" });
    }

    const { rows } = await pool.query(
      `INSERT INTO clientes (nombre, telefono, correo)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [nombre, telefono, correo || null]
    );

    res.status(201).json(rows[0]);
  } catch (error) {
    console.error("Error al crear cliente:", error);
    res.status(500).json({ error: "Error al crear cliente" });
  }
};

// ✅ Editar cliente
export const updateCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, telefono, correo } = req.body;

    if (!nombre || !telefono) {
      return res.status(400).json({ error: "Nombre y teléfono son obligatorios" });
    }

    const { rowCount, rows } = await pool.query(
      `UPDATE clientes
       SET nombre = $1,
           telefono = $2,
           correo = $3
       WHERE id = $4
       RETURNING *`,
      [nombre, telefono, correo || null, id]
    );

    if (rowCount === 0) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error al editar cliente:", error);
    res.status(500).json({ error: "Error al editar cliente" });
  }
};

// ✅ Eliminar cliente
export const deleteCliente = async (req, res) => {
  try {
    const { id } = req.params;

    const { rowCount } = await pool.query(
      "DELETE FROM clientes WHERE id = $1",
      [id]
    );

    if (rowCount === 0) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }

    res.json({ message: "Cliente eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar cliente:", error);
    res.status(500).json({ error: "Error al eliminar cliente" });
  }
};
