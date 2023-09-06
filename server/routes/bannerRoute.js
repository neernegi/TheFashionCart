import express from "express";
import {
  createBanner,
  deleteBanner,
  getAllBanner,
} from "../controller/bannerController.js";
import multer from "multer";
const upload = multer();
const router = express.Router();

router.post("/createbanner", upload.single("image"), createBanner);
router.get("/getbanner", getAllBanner);
router.delete("/delete/:publicId", deleteBanner);

export default router;
