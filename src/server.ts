import express from "express";
import router from "./routes/cidades.routes.js";
import { conectar } from "./database/connection.js";

const app = express();

app.use(express.json());

app.use("/cidades", router);

async function iniciar() {
    await conectar();
    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    });
}

iniciar();