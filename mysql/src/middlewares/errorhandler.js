import { ApiError } from "../utils/ApiError.js";

export const globalErrorHandler = (err, req, res, next) => {
  if (err instanceof ApiError)
    return res
      .status(err.statusCode)
      .json({ success: false, message: err.message, error: err.errors });
    
  if (err.name === "SequelizeValidationError")
    return res
      .status(err.statusCode)
      .json({ success: false, message: "Duplicate entry", error: err.errors });

  console.log(err);
  res.status(500).json({ success: false, message: "internal server error" });
};
