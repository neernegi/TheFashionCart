import express from "express";
import {
  processPayment,
  sendStripeApiKey,
} from "../controller/paymentController.js";
import { isAuthenticatedUser } from "../middleware/auth.js";

const router = express.Router();

router.post("/payment-process", processPayment);

router.get("/stripeapikey", sendStripeApiKey);

export default router;
