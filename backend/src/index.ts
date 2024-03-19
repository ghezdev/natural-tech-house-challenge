import express, { Express, Request, Response } from "express";
import "express-async-errors";
import dotenv from "dotenv";
import { routerPokemon } from "./routes/pokemon";
import { errorHandler } from "./middlewares/errors";
import morgan from "morgan";
import cors from "cors";
import { swaggerDocs } from "./config";

dotenv.config();

const app: Express = express();
const port = Number(process.env.PORT) || 3000;

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/api/pokemon", routerPokemon);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);

  swaggerDocs(app, port);
});

export default app;

