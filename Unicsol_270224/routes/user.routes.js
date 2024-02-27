import { Router } from "express";
import {
  registerUser,
  updateUser,
  getUser,
  deleteUser,
  loginUser,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  userLoginValidator,
  userRegisterValidator,
  updateProfileValidator,
} from "../validators/user.validator.js";
import { validate } from "../validators/data.validator.js";

const router = Router();

// Unsecured route
router.route("/register").post(userRegisterValidator(), validate, registerUser);
router.route("/login").post(userLoginValidator(), validate, loginUser);

// Secured routes
router
  .route("/updateuser")
  .put(verifyJWT, updateProfileValidator(), validate, updateUser);
router.route("/getuser").get(verifyJWT, getUser);
router.route("/deleteaccount").delete(verifyJWT, deleteUser);

export default router;
