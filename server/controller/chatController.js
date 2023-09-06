import catchAsyncError from "../middleware/catchAsyncError.js";
import Seller from "../models/sellerModel.js";
import Chat from "../models/chatRoom.Model.js";
import User from "../models/userModel.js";
import ChatRoom from "../models/chatRoom.Model.js";

export const getAllChatSeller = async (req, res) => {
  try {
    const { search } = req.query;
    const keyword = search
      ? {
          shopName: { $regex: search, $options: "i" },
        }
      : {};

    const users = await Seller.find(keyword);

    if (users.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No sellers found." });
    }

    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error("Error in getAllChatSeller:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
// controllers/chatController.js

export const chatController = catchAsyncError(async (req, res, next) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({
      message: "UserId param not sent with the request",
    });
  }

  // Check if the participant with the given userId exists and is either User or Seller
  const participant =
    (await User.findById(userId)) || (await Seller.findById(userId));
  if (!participant) {
    return res.status(404).json({
      message: "Invalid User ID provided.",
    });
  }

  // Check if the user creating the chat is "Seller" and the participant is "User"
  if (req.user instanceof Seller && participant instanceof User) {
    // Check if there's an existing chat between the "Seller" and "User"
    const existingChat = await ChatRoom.findOne({
      participantsType: "Seller",
      participants: {
        $all: [req.user._id, userId],
      },
    })
      .populate("participants", "-password")
      .populate("latestMessage");

    if (existingChat) {
      return res.send(existingChat);
    }

    // If no existing chat, create a new chat room
    const newChatData = {
      chatName: "sender", // Modify as needed
      participants: [req.user._id, userId],
      participantsType: "Seller",
    };

    const newChatRoom = await ChatRoom.create(newChatData);

    return res.send(newChatRoom);
  }

  // Check if the user creating the chat is "User" and the participant is "Seller"
  if (req.user instanceof User && participant instanceof Seller) {
    // Check if there's an existing chat between the "User" and "Seller"
    const existingChat = await ChatRoom.findOne({
      participantsType: "User",
      participants: {
        $all: [req.user._id, userId],
      },
    })
      .populate("participants", "-password")
      .populate("latestMessage");

    if (existingChat) {
      return res.send(existingChat);
    }

    // If no existing chat, create a new chat room
    const newChatData = {
      chatName: "sender", // Modify as needed
      participants: [req.user._id, userId],
      participantsType: "User",
    };

    const newChatRoom = await ChatRoom.create(newChatData);

    return res.send(newChatRoom);
  }

  // If the user is "User" but the participant is not "Seller", or
  // if the user is "Seller" but the participant is not "User", then it's an invalid operation.
  return res.status(403).json({
    message:
      "Invalid operation. Seller can only chat with User, and User can only chat with Seller.",
  });
});

export const fetchChats = async (req, res) => {
  try {
    // Use the $in operator to match chats with participantsType "Seller" or "User"
    const results = await Chat.find({
      participantsType: { $in: ["Seller", "User"] },
      participants: { $elemMatch: { $eq: req.user._id } },
    })
      .populate("participants", "-password")
      .populate({
        path: "latestMessage",
        populate: {
          path: "sender",
          select: "name pic email",
          match: { senderType: { $in: ["Seller", "User"] } }, // Add this condition
        },
      })
      .sort({ updatedAt: -1 });

    res.status(200).send(results);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};



