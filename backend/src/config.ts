import axios from "axios";
import swaggerJSDoc, { Options as SwaggerJsdocOptions } from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { version } from "../package.json";
import { Express } from "express";

export const axiosInstance = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
});

const options: SwaggerJsdocOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "PokéAPI Docs",
      version,
    },
    // components: {
    //   securitySchemes: {
    //     bearerAuth: {
    //       type: "http",
    //       scheme: "bearer",
    //       bearerFormat: "JWT",
    //     },
    //   },
    // },
    // security: [
    //   {
    //     bearerAuth: [],
    //   },
    // ],
  },
  apis: ["./src/routes/*"],
};

const swaggerSpec = swaggerJSDoc(options);

export function swaggerDocs(app: Express, port: number) {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  console.info(`Docs available at http://localhost:${port}/docs`);
}

