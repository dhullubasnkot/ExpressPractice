import { Schema } from "mongoose";
import mongoose from "mongoose";
import { ref } from "process";

const orderSchema = new Schema({
  order_id: { type: mongoose.Types.ObjectId, ref: "User", require: true },
  user_id: { type: Number, require: true },
  order_date: { type: Date, require: true },
  total_amount: { type: Number, required: true },
  status: {
    type: String,
    enum: ["shipped", "completed", "cancelled", "pending"],
  },
});

const order = mongoose.model("User", orderSchema);

export default order;
