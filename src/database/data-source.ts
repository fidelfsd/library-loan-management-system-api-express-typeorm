import { DataSource } from "typeorm";
import "reflect-metadata";
import dotenv from "dotenv";

// -----------------------------------------------------------------------------

// Load environment variables from .env file
dotenv.config();

// -----------------------------------------------------------------------------

export const dataSource = new DataSource({
   type: "mysql",
   host: process.env.DB_HOST,
   port: Number(process.env.DB_PORT),
   username: process.env.DB_USER,
   password: process.env.DB_PASSWORD,
   database: process.env.DB_DATABASE,
   entities: [`${__dirname}/../models/**/*{.js,.ts}`],
   migrations: [`${__dirname}/migrations/**/*{.js,.ts}`],
});
