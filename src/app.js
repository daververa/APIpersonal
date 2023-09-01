import cors from "cors";
import express from "express";
import rutas from "./routes/routes.js";

export class App {

    constructor() {
        this.app = express();
        this.middleware();
    }

    iniciarServidor() {
        this.app.listen(3000, () => console.log("Server online"))
    };

    middleware() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use("/", rutas);
    }
}