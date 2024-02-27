import { body, param } from "express-validator";

export const userRegisterValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is invalid"),
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),
    body("description").optional(),
  ];
};

export const userLoginValidator = () => {
  return [
    body("email").notEmpty().isEmail().withMessage("Email is invalid"),
    body("password").notEmpty().withMessage("Password is required"),
  ];
};
export const updateProfileValidator = () => {
  return [body("email").optional().isEmail().withMessage("Email is invalid")];
};
