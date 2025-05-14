import swaggerJsdoc from "./swagger.ts";
import swaggerUi from "swagger-ui-express";
import express from "express";

const app = express();

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Cadastro",
      version: "1.0.0",
      description: "Documentação da API de cadastro de usuários"
    },
  },
  apis: ["./src/app/api/user/route.ts"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

export default app;
