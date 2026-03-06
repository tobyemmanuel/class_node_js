import jwt from "jsonwebtoken";
import { configuration } from "../config/env.js";

export const signToken = (payload) =>
  jwt.sign(payload, configuration.JWT_SECRET, {
    expiresIn: configuration.JWT_EXPIRES_IN,
  });

export const verifyToken = (token) =>
  jwt.verify(token, configuration.JWT_SECRET);
