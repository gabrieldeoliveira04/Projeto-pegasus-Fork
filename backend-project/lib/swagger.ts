import type { OpenAPIObject } from "openapi3-ts/oas30";


export const swaggerDocument: OpenAPIObject = {
  openapi: "3.0.0",
  info: {
    title: "API de Cadastro Pegasus",
    version: "1.0.0",
    description: "Documentação da API de cadastro de usuários.",
  },
  paths: {
    "/api/cadastro": {
      post: {
        summary: "Cadastrar novo usuário",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  nome: { type: "string" },
                  email: { type: "string" },
                  CPF: { type: "string" },
                  senha: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Usuário cadastrado com sucesso",
          },
          400: {
            description: "Erro de validação ou e-mail duplicado",
          },
        },
      },
    },
  },
};
