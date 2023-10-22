import express from "express";
import {
  createProduct,
  createProductReview,
  deleteProduct,
  deleteReview,
  getAllProducts,
  getCategoryFilterProducts,
  getFailedProducts,
  getPassedProducts,
  getProductReviews,
  getProgressProducts,
  getSellerProducts,
  getSingleProductDetail,
  getSubcatetegoryFilterProducts,
  updateProducts,
} from "../controller/productController.js";
import {
  isAuthenticatedUser,
  authorizeRoles,
  isAuthenticatedSeller,
} from "../middleware/auth.js";
import multer from "multer";
const storage = multer.memoryStorage(); // Use memory storage for file uploads

const upload = multer({ storage: storage });

const router = express.Router();

/*
          For common user
*/
router.get("/allProducts", getAllProducts);
router.get("/category-filter-products/:categoryId", getCategoryFilterProducts);
router.get("/subcategory-filter-products/:subcategoryId", getSubcatetegoryFilterProducts);
router.get("/product-detail/:id", getSingleProductDetail);

/*
           For seller who create products
*/
router.get("/seller-products/:sellerId", getSellerProducts);
router.post(
  "/create/:sellerId/new-products",
  
  upload.array("avatar", 4), 
  createProduct
);
router.put("/updateProduct/:id", isAuthenticatedSeller, updateProducts);
router.delete("/delete/:id", isAuthenticatedSeller, deleteProduct);

router.get("/progress-products", isAuthenticatedSeller, getProgressProducts);
router.get("/passed-products", isAuthenticatedSeller, getPassedProducts);
router.get("/failed-products", isAuthenticatedSeller, getFailedProducts);

/*
            Reviews router for User
*/
router.put("/review", isAuthenticatedUser, createProductReview);
router
  .route("/reviews")
  .get(getProductReviews)
  .delete(isAuthenticatedUser, deleteReview);

export default router;
