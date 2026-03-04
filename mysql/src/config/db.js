import { Sequelize } from "sequelize";
import { configuration } from "./env.js";

export const sequelize = new Sequelize(
  configuration.DB_NAME,
  configuration.DB_USER,
  configuration.DB_PASSWORD,
  {
    host: configuration.DB_HOST,
    dialect: configuration.DB_DIALECT,
    logging: configuration.NODE_ENV === "development" ? console.log : false,
    pool: { max: 10, min: 0, acquire: 30000, idle: 10000 }
  },
);
