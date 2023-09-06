import express from "express";
import { isAuthenticatedSeller, isAuthenticatedUser } from "../middleware/auth.js";
import { allMessages, sendMessage } from "../controller/messageController.js";

const router  = express.Router()

router.post('/user-send-message',isAuthenticatedUser,sendMessage)
router.post('/seller-send-message',isAuthenticatedSeller,sendMessage)
router.get('/seller-send-message/:chatId',isAuthenticatedSeller,allMessages)
router.get('/user-send-message/:chatId',isAuthenticatedUser,allMessages)


export default router