import { Schema } from "mongoose";
import mongoose from "mongoose";

const orderSchema = new Schema({
  id: { type: Number, require: true },
  userid: { type: Number, require: true },
  createdAt: { type: Date, require: true },
});

const order = mongoose.model("User", orderSchema);

export default order;
