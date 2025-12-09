import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Client } = pg;

async function createDatabase() {
  const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DDB_NAME || "postgres",
  });

  try {
    await client.connect();
    const dbName = process.env.DB_NAME;

    console.log(`Creando base de datos '${dbName}' si no existe...`);

    // ⚠️ IMPORTANTE: crear DB si no existe
    const res = await client.query(`
      SELECT 1 FROM pg_database WHERE datname = '${dbName}';
    `);

    if (res.rowCount === 0) {
      await client.query(`CREATE DATABASE ${dbName};`);
      console.log(`✔ Base de datos '${dbName}' creada correctamente.`);
    } else {
      console.log(`✔ La base de datos '${dbName}' ya existe.`);
    }
  } catch (error) {
    console.error("❌ Error creando la base de datos:", error);
  } finally {
    await client.end();
  }
}

createDatabase();
export default createDatabase;