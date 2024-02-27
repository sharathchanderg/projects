import { validationResult } from "express-validator";
// import { errorHandler } from "../middlewares/error.middlewares.js";
import { apiError } from "../utils/apiError.js";

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.path]: err.msg }));

  // 422: Unprocessable Entity
  throw new apiError(422, "Received data is not valid", extractedErrors);
};
