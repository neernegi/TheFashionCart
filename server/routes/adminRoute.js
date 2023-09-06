import express from "express";
import {
  authorizeRoles,
  isAuthenticatedSeller,
  isAuthenticatedUser,
} from "../middleware/auth.js";
import {
  deleteSellerProfile,
  // deleteUserProfile,
  getAllSellerData,
  getAllUser,
  getFailedQcStatus,
  getPassedQcStatus,
  getProgressQcStatus,
  getSingleSeller,
  getSingleUser,
  updateProductQCStatus,
} from "../controller/adminController.js";
import {
  getAllProducts,
  updateProducts,
} from "../controller/productController.js";

const router = express.Router();

router.get(
  "/all-users",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getAllUser
);
router.get(
  "/all-sellers",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getAllSellerData
);

router
  .route("/user-detail/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser);
// .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUserProfile);

router
  .route("/seller-detail/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleSeller);
// .delete(isAuthenticatedSeller, authorizeRoles("admin"), deleteSellerProfile);


router.get('/all-product',isAuthenticatedUser,authorizeRoles('admin'),getAllProducts)



router.put(
  "/product-qcCheck/:productId",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  updateProductQCStatus
);

router.get(
  "/all-products",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getAllProducts
);

router.get("/progress-products",isAuthenticatedUser,authorizeRoles("admin"),getProgressQcStatus)
router.get("/passed-products",isAuthenticatedUser,authorizeRoles("admin"),getPassedQcStatus)
router.get("/failed-products",isAuthenticatedUser,authorizeRoles("admin"),getFailedQcStatus)

export default router;
