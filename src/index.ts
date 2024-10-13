import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { imagemRoutes, userRoutes } from "./routes";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import path from "path";
import YAML from "yaml";
import { AppDataSource } from "./config/data-source";

dotenv.config();

const PORT = process.env.PORT || 8000;
const app = express();

app.use(express.json());
app.use(cors({
  origin: [
    "http://localhost:3000",
    "http://localhost:8080"
  ],
}));

const swaggerFile = fs.readFileSync(path.join(__dirname, "config", "swagger.yml"), "utf-8");
const swaggerDocument = YAML.parse(swaggerFile);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/imagens", imagemRoutes);
app.use("/api/usuarios", userRoutes);

AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Rodando na porta ${PORT}`);
      console.log(`swagger: http://localhost:8000/api-docs`);
    });
  })
  .catch((error) => console.log("Erro ao inicializar o banco de dados", error));