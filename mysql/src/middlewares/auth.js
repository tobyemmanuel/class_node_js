import { verifyToken } from "../utils/jwt.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";

export const authenticate = async (req, res, next) => {
  try {
    const header = req.headers.authorization || undefined;
    if (!header || !header.startsWith("Bearer")) throw ApiError.unauthorized();

    const token = header.split(" ")[1];

    const decoded = verifyToken(token);

    const user = await User.findByPk(decoded.id);

    if (!user) throw ApiError.unauthorized();

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

export const authorizeAdmin = async (req, res, next) => {
  try {
    if (!req.user) throw ApiError.unauthorized();
    if (req.user.role !== "admin" || req.user.role !== "superadmin")
      throw ApiError.unauthorized('not an admin');

    next();
  } catch (error) {
    next(error);
  }
};
