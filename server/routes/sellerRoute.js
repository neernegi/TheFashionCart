import express from "express";

import {
  SellerDetail,
  createSellerDetails,
  forgotSellerPassword,
  getSellerDetails,
  loginSeller,
  registerSeller,
  updateSellerPassword,
  updateSellerProfile,
} from "../controller/sellerController.js";
import { logout } from "../utils/logout.js";
import { isAuthenticatedSeller } from "../middleware/auth.js";
import multer from "multer";
const storage = multer.memoryStorage(); // Use memory storage for file uploads

const upload = multer({ storage: storage });
// const upload = multer();
const router = express.Router();

router.post("/register", upload.single("avatar"), registerSeller);

router.post("/seller-details/:sellerId", createSellerDetails);
router.post("/login", loginSeller);
router.put("/password-update", isAuthenticatedSeller, updateSellerPassword);
router.post("/password/forgot", forgotSellerPassword);
router.put("/update-profile", isAuthenticatedSeller, updateSellerProfile);
router.get("/get/seller-details", isAuthenticatedSeller, getSellerDetails);
router.get("/get-seller-details/:id", SellerDetail);
router.post("/logout", logout);

export default router;
