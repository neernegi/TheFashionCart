// models/ChatRoom.js

import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  chatName: {
    type: String,
    trim: true,
  },
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "participantsType",
    },
  ],
  participantsType: {
    type: String,
    required: true,
    enum: ["Seller", "User"],
  },
  latestMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Message",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("ChatRoom", chatSchema);
