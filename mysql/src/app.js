import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { configuration } from "./config/env.js";
import { corsOptions } from "./config/cors.js";
import { sequelize } from "./config/db.js";

import AuthRoute from "./routes/auth.route.js";

import { globalErrorHandler } from "./middlewares/errorhandler.js";

const app = express();
const PORT = configuration.PORT;

// app.use(cors(corsOptions));s
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/health", (req, res) => {
  res.json({ status: "ok", date: new Date() });
});

app.use("/auth", AuthRoute);

app.use(globalErrorHandler);

(async () => {
  try {
    await sequelize.authenticate();

    // await sequelize.sync({ alter: true });

    console.log("Connection has been established successfully.");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to start the application:", error);
    process.exit(1);
  }
})();
