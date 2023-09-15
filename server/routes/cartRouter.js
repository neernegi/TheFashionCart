import express from "express";
import {
  createCart,
  deleteCartProducts,
  fetchCartProducts,
} from "../controller/cartController.js";
import { isAuthenticatedUser } from "../middleware/auth.js";

const router = express.Router();
//  /products is already added in base path

router.post("/create-cart/:userId", createCart);
router.get("/fetch-cart/:userId", fetchCartProducts);
router.delete("/delete-cart/:id", deleteCartProducts);

export default router;
