import {
  CreateCategory,
  DeleteCategory,
  getAllCategoriesController,
  getCategoryBYIdController,
  getProductsByCategoryIdController,
  UpdateCategory,
} from "../controllers/categorycontroller";
import express from "express";

const router = express.Router();

router.get("/", getAllCategoriesController);
router.get("/:id", getCategoryBYIdController);
router.get("/:id/products", getProductsByCategoryIdController);
router.put("/:id", UpdateCategory);
router.delete("/:id", DeleteCategory);
router.post("/", CreateCategory);
export default router;
