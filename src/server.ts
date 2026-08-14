import "dotenv/config";
import express from "express";
import { conectar } from "./database/connection.js";
import routerCidades from "./routes/cidades.routes.js";
import routerUsuarios from "./routes/usuarios.routes.js";
import routerAuth from "./routes/auth.routes.js";

const app = express();

app.use(express.json());

app.use("/usuarios", routerUsuarios);

app.use("/auth", routerAuth);

app.use("/cidades", routerCidades);

async function iniciar() {
  await conectar();
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
}

iniciar();
