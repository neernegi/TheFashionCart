import express from "express";
import { createShippingInfo } from "../controller/shippingController.js";
// import { isAuthenticatedUser } from "../middleware/auth.js";
const router = express.Router();

router.post("/create-shipping-address/:userId", createShippingInfo);


export default router;