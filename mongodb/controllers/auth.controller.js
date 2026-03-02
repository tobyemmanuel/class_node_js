import crypto from "node:crypto";
import { User } from "../models/user.model.js";
import { Role } from "../models/role.model.js";

export const register = async (req, res) => {
  console.log(req.body);
  const { username, email, password } = req.body;

  if (await User.findOne({ email })) {
    res.status(404).json({ success: false, message: "Email already exists" });
    return;
  }

  const verifyToken = crypto.randomBytes(32).toString("hex");

  const user = await User.create({
    username,
    email,
    password,
    verifyToken,
    roles: 1,
  });

  res.json({ id: user._id, email, message: "User registered successfully" });
};

export const login = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    res.status(404).json({ success: false, message: "Email does not exist" });
    return;
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    res.status(404).json({ success: false, message: "Password is incorrect" });
    return;
  }

  res.json({ id: user._id, email, message: "User logged in successfully" });
};
