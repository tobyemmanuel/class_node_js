import { Router } from "express";
import { register, login, profile } from "../controllers/auth.controller.js";
import { authenticate, authorizeAdmin } from "../middlewares/auth.js";

const route = Router();

route.post("/register", register);
route.post("/login", login);
route.get("/profile", authenticate, profile);
route.get("/admin", authenticate, authorizeAdmin, (req, res) => {
  res.json({ success: true, message: "admin" });
});

export default route;
