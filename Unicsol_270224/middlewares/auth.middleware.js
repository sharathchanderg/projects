import { User } from "../models/user.model.js";
import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "./error.middleware.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// verify jwt token 
export const verifyJWT = asyncHandler(async (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  let token = "";
  if (bearerHeader) {
    token = bearerHeader.split(" ")[1];
  }
  if (!token) {
    throw new apiError(401, "Unauthorized request");
  }
  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken?.userId).select("-password");
    if (!user) {
      throw new apiError(401, "Invalid access token");
    }
    req.user = user;
    next();
  } catch (error) {
    throw new apiError(401, error?.message || "Invalid access token");
  }
});
