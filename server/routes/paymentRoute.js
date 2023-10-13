import express from "express";
import {
  processPayment,
  sendStripeApiKey,
} from "../controller/paymentController";
import { isAuthenticatedUser } from "../middleware/auth";

const router = express.Router();

router.post("/payment/process", isAuthenticatedUser, processPayment);

router.get("/stripeapikey", isAuthenticatedUser, sendStripeApiKey);

export default router;
