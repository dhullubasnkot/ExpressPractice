import { Schema } from "mongoose";
import mongoose from "mongoose";

const productSchema = new Schema({
  id: { type: Number, require: true },
  name: { type: String, require: true },
  description: { type: String, require: true },
  stock_quantity: { type: Number, require: true },
  image: { type: String },
  category_id: {
    type: mongoose.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});

const product = mongoose.model("User", productSchema);

export default product;
