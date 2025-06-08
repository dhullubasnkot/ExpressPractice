import { Schema } from "mongoose";
import mongoose from "mongoose";
import { ref } from "process";
import Category from "../category/category-MongoDb-Models";
// cat
const ProductCategory = new Schema({
  product_id: { type: mongoose.Types.ObjectId, ref: "products", require: true },
  category_id: {
    type: mongoose.Types.ObjectId,
    ref: "category",
    require: true,
  },
});
const ProductCat = mongoose.model("Product_Category", ProductCategory);
