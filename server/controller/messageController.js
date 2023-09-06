import catchAsyncError from "../middleware/catchAsyncError.js";
import Message from "../models/chatMessageModel.js";
import User from "../models/userModel.js";
import Seller from "../models/sellerModel.js";
import Chat from "../models/chatRoom.Model.js";

export const sendMessage = catchAsyncError(async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.status(400).json({ error: "Invalid data" });
  }

  // Determine the senderType based on user's role (Seller or User)
  const senderType = req.user instanceof Seller ? "Seller" : "User";

  const newMessage = {
    content: content,
    chat: chatId,
    senderType: senderType, // Set the senderType
    sender: req.user._id,
  };

  try {
    const message = await Message.create(newMessage);

    // Populate the sender based on the senderType
    await message.populate("sender", "name pic email")
    await message.populate("chat")

    // Populate the chat participants based on their types
    await User.populate(message, {
      path: "chat.participants",
      select: "name pic email",
      match: { participantsType: "User" },
    });
    await Seller.populate(message, {
      path: "chat.participants",
      select: "name pic email",
      match: { participantsType: "Seller" },
    });

    await Chat.findByIdAndUpdate(chatId, {
      latestMessage: message,
    });

    res.json(message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export const allMessages = async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate({
        path: "sender",
        select: "name pic email",
        model: req.user.senderType === "User" ? "User" : "Seller", // Use senderType to determine the model
      })
      .populate("chat");

    res.json(messages);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
