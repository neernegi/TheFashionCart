import express from "express";
import {
  forgotUserPassword,
  getUserDetails,
  loginUser,
  registerUser,
  updateUserPassword,
  updateUserProfile,
} from "../controller/userController.js";
import { isAuthenticatedUser } from "../middleware/auth.js";
import { logout } from "../utils/logout.js";
import multer from "multer";
const upload = multer();

const router = express.Router();

router.post("/register", upload.single("avatar"), registerUser);
router.post("/login", loginUser);
router.post("/password/forgot", forgotUserPassword);
router.get("/get/user-details", isAuthenticatedUser, getUserDetails);
router.put("/password/update", isAuthenticatedUser, updateUserPassword);
router.put("/user-update/profile", isAuthenticatedUser, updateUserProfile);

router.get("/logout", logout);

export default router;
