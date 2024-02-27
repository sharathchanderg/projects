import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../middlewares/error.middleware.js";

// registering the user
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, description } = req.body;

  const existedUser = await User.findOne({ email });

  if (existedUser) {
    throw new apiError(409, "User with email or username already exists", []);
  }
  const createdUser = await User.create({
    name,
    email,
    description,
    password,
  });

  if (!createdUser) {
    throw new apiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(
      new apiResponse(
        200,
        { user: createdUser },
        "Users registered successfully and verification email has been sent on your email."
      )
    );
});

// user login
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    throw new apiError(400, "Email is required");
  }
  const user = await User.findOne({
    email,
  });
  if (!user) {
    throw new apiError(404, "User does not exist");
  }

  // Compare the incoming password with hashed password
  const isPasswordValid = await bcrypt.compareSync(password, user.password);

  if (!isPasswordValid) {
    throw new apiError(401, "Invalid user credentials");
  }

  // get the user document ignoring the password and refreshToken field
  const loggedInUser = await User.findById(user._id).select("-password");

  const accessToken = jwt.sign(
    {
      userId: loggedInUser._id,
      name: loggedInUser.name,
      email: loggedInUser.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
  return res.status(200).json(
    new apiResponse(
      200,
      { user: loggedInUser, accessToken }, // send access and refresh token in response if client decides to save them by themselves
      "User logged in successfully"
    )
  );
});

// update profile
export const updateUser = asyncHandler(async (req, res) => {
  const { name, email, description } = req.body;
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        name,
        email,
        description,
      },
    },
    { new: true }
  );
  if (!user) {
    throw new apiError(404, "User does not exist");
  }

  return res
    .status(200)
    .json(new apiResponse(200, user, "User updated successfully"));
});

// delete user account
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.user._id);

  if (!user) {
    throw new apiError(404, "User does not exist");
  }

  return res
    .status(200)
    .json(
      new apiResponse(
        200,
        { deletedUser: user },
        "Account deleted successfully"
      )
    );
});

// get user profile
export const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select(["-__v", "-password"]);

  // If the user is not
  if (!user) {
    throw new apiError(404, "User does not exist");
  }
  return res
    .status(200)
    .json(new apiResponse(200, user, "User fetched successfully"));
});
