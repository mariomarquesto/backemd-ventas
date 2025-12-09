import { pool } from "../db/pool.js";

export const getProductos = async (_, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM productos");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener productos" });
  }
};

export const createProducto = async (req, res) => {
  try {
    const { nombre, precio: precioStr, stock: stockStr, id_seccion, id_proveedor } = req.body;

    // Convertir strings a números
    const precio = Number(precioStr);
    const stock = Number(stockStr);

    // Validación básica
    if (!nombre || isNaN(precio) || isNaN(stock) || !id_seccion || !id_proveedor) {
      return res.status(400).json({ message: "Faltan datos obligatorios o tipo inválido" });
    }

    // Verificar existencia de la sección
    const seccion = await pool.query("SELECT * FROM secciones WHERE id = $1", [id_seccion]);
    if (seccion.rows.length === 0) {
      return res.status(400).json({ message: "La sección no existe" });
    }

    // Verificar existencia del proveedor
    const proveedor = await pool.query("SELECT * FROM proveedores WHERE id = $1", [id_proveedor]);
    if (proveedor.rows.length === 0) {
      return res.status(400).json({ message: "El proveedor no existe" });
    }

    // Inserción segura en la base de datos
    const { rows } = await pool.query(
      `INSERT INTO productos (nombre, precio, stock, id_seccion, id_proveedor)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [nombre, precio, stock, id_seccion, id_proveedor]
    );

    res.status(201).json(rows[0]);
  } catch (error) {
    console.error("ERROR REAL:", error);
    res.status(500).json({ message: "Error al crear producto", error: error.message });
  }
};