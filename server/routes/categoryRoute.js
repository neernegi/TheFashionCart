import express from "express";
import { authorizeRoles, isAuthenticatedUser } from "../middleware/auth.js";
import {
  createCategory,
  createSubCategory,
  getAllCategory,
  getSubCategory,
  updateCategory,
} from "../controller/categoryController.js";
import multer from "multer";

const router = express.Router();
const upload = multer();
router.post("/create-category", upload.single("avatar"), createCategory);
router.put("/update-category", updateCategory);
router.post("/create-subcategory", createSubCategory);
router.get("/get-subcategories/:categoryName", getSubCategory);

router.get("/get-all-category", getAllCategory);

export default router;
