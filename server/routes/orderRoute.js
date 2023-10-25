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
  updateOrderItemStatus,
} from "../controller/orderController.js";
const router = express.Router();

// router.post("/user-create/new-shipping/:userId", isAuthenticatedUser,createShippingInfo);
router.post("/user-create/new-order/:userId",createNewOrder);

router.get("/user-order-detail/:userId", getSingleOrder);

router.get("/user-orders/:userId", myOrders);

router.get("/seller-orders/:sellerId",getSellerOrders);

router.put("/seller-orders/:orderId/order-items/:orderItemId", updateOrderItemStatus);

router
  .route("/seller-order/:id")
  .delete(isAuthenticatedSeller, deleteOrder)
  .delete(isAuthenticatedUser,deleteOrder)

export default router;
