import mongoose from "mongoose";

const shippingInfoSchema = new mongoose.Schema({
  
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

export default mongoose.model("ShippingAddress", shippingInfoSchema);
