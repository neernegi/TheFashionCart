import express from "express";
import {
    chatController,
  fetchChats,
//   chatSellerRoomController,
//   chatUserRoomController,
  getAllChatSeller,
} from "../controller/chatController.js";
import {
  isAuthenticatedSeller,
  isAuthenticatedUser,
} from "../middleware/auth.js";

const router = express.Router();

router.get("/search-seller", isAuthenticatedUser, getAllChatSeller);

router.post("/user-chatroom",isAuthenticatedUser, chatController);
router.post("/seller-chatroom",isAuthenticatedSeller, chatController);
// router.get("/seller-fetch",isAuthenticatedSeller,fetchChats)
router.get("/chat-fetch",isAuthenticatedUser||isAuthenticatedSeller,fetchChats)





export default router;
