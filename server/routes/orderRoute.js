import express from "express";
import {
  isAuthenticatedSeller,
  isAuthenticatedUser,
} from "../middleware/auth.js";
import {
 
  
  createNewOrder,
  deleteOrder,
  getSellerOrders,
  getSingleOrder,
  myOrders,
  updateOrder,
} from "../controller/orderController.js";
const router = express.Router();

// router.post("/user-create/new-shipping/:userId", isAuthenticatedUser,createShippingInfo);
router.post("/user-create/new-order/:userId",createNewOrder);

router.get("/user-order-detail/:userId", getSingleOrder);

router.get("/user-orders/:userId", myOrders);

router.get("/seller-orders", isAuthenticatedSeller,getSellerOrders);

router
  .route("/seller-order/:id")
  .put(isAuthenticatedSeller, updateOrder)
  .delete(isAuthenticatedSeller, deleteOrder)
  .delete(isAuthenticatedUser,deleteOrder)

export default router;
