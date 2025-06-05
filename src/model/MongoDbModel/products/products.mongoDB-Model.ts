import { Schema } from "mongoose";
import mongoose from "mongoose";

const productSchema = new Schema({
  productid: { type: Number, require: true },
  productname: { type: String, require: true },
  description: { type: String, require: true },
  stock: { type: Number, require: true },
});

const product = mongoose.model("User", productSchema);

export default product;
