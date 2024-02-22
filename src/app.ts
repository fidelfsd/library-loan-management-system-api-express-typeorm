import express, { Application } from "express";
import baseRoutes from "./routes/base.routes";
import apiRoutes from "./routes/api.routes";
import dotenv from "dotenv";
import cors from "cors";
import { handleNotFound } from "./middlewares/errorHandler";
import corsOptions from "./config/cors";

// -----------------------------------------------------------------------------

dotenv.config();

const app: Application = express();

// Middleware setup
app.use(express.json());
app.use(cors(corsOptions));

// Register Base Routes
app.use("/", baseRoutes);

// Register API Routes
app.use("/api", apiRoutes);

// Handle 404 errors
app.use(handleNotFound);

export default app;
