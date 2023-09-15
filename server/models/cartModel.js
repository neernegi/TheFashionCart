import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  quantity: { type: Number, required: true },
  productId: { type: mongoose.Schema.ObjectId, ref: "Product", required: true },
  userId: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
});

export default mongoose.model("Cart", cartSchema);
