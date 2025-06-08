import mongoose, { Mongoose } from "mongoose";
import dotenv from "dotenv";
const url = process.env.MONGO_URL;
mongoose.connect(
  "mongodb+srv://123baglung:balgita@89@cluster0.bouubfj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);
const db = mongoose.connection;

db.on("error", (err) => {
  console.log("Conection Refused", err);
});
db.once("open", function () {
  console.log("Connected to MongoDB!");
});
export default mongoose;
