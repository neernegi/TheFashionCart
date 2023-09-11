import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  quantity: { type: Number, required: true },
  product: { type: mongoose.Schema.ObjectId, ref: "Product", required: true },
  user: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
  size: { type: Schema.Types.Mixed },
  color: { type: Schema.Types.Mixed },
});

const virtual = cartSchema.virtual("id");
virtual.get(function () {
  return this._id;
});
cartSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

export default mongoose.model("Cart", cartSchema);
