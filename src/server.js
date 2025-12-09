import app from "./app.js";
import { createTables } from "./sql/createTables.js";

const PORT = 3000;

await createTables();

app.listen(PORT, () => {
  console.log("Servidor corriendo en Puerto " + PORT);
});
