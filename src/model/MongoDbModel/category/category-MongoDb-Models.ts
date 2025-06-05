import { Schema } from "mongoose";
import mongoose from "mongoose";

const categorySchema = new Schema({
  id: { type: Number, require: true },
  categoryname: { type: String, require: true },
});

const Category = mongoose.model("User", categorySchema);

export default Category;
