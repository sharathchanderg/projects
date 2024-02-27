import mongoose from "mongoose";
import { apiError } from "../utils/apiError.js";

// for async handling
export const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};

// for error handling
export const errorHandler = (err, req, res, next) => {
  let error = err;

  // Check if the error is an instance of an apiError class which extends native Error class
  if (!(error instanceof apiError)) {
    // create a new apiError instance to keep the consistency

    // assign an appropriate status code
    const statusCode =
      error.statusCode || error instanceof mongoose.Error ? 400 : 500;

    // set a message from native Error instance or a custom one
    const message = error.message || "Something went wrong";
    error = new apiError(statusCode, message, error?.errors || [], err.stack);
  }

  // Now we are sure that the `error` variable will be an instance of apiError class
  const response = {
    ...error,
    message: error.message,
  };

  // Send error response
  return res.status(error.statusCode).json(response);
};






