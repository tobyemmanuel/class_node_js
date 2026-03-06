import { AuthService } from "../services/auth.service.js";
import { sendSuccess } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const register = asyncHandler(async (req, res) => {
  const user = await AuthService.register(req.body);
  sendSuccess(
    res,
    { id: user.public_id, email: user.email },
    "Registered successfully",
    201,
  );
});

export const login = asyncHandler(async (req, res) => {
  const loginProcess = await AuthService.login(req.body);
  sendSuccess(
    res,
    { user: loginProcess.user, token: loginProcess.accessToken },
    "Logged in successfully",
    201,
  );
});


export const profile = asyncHandler(async (req, res) => {
  sendSuccess(
    res,
    {user: req.user},
    "Logged in successfully",
    201,
  );
});