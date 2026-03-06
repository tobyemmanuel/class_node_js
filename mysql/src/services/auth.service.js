import crypto from "node:crypto";
import { v4 as uuidv4 } from "uuid";
import { User } from "../models/index.js";
import { ApiError } from "../utils/ApiError.js";
import { signToken } from "../utils/jwt.js";

export class AuthService {
  static async register(data) {
    if (await User.findOne({ where: { email: data.email } }))
      throw ApiError.badRequest("Email already exists");

    const verifyToken = crypto.randomBytes(32).toString("hex");
    const role = data.role || "user";

    const user = await User.create({ ...data, verifyToken, role });

    return user;
  }

  static async login({ email, password }) {
    const user = await User.findOne({ where: { email } });
    if (!user || !(await user.comparePassword(password)))
      throw ApiError.badRequest("Invalid Credentials");

    await user.update({ lastLogin: new Date() });

    const payload = { id: user.id, role: user.role };
    const accessToken = signToken(payload);

    return { user, accessToken };
  }
}
