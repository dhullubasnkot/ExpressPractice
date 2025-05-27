import {
  getAllCategoriesController,
  getCategoryBYIdController,
  getProductsByCategoryIdController,
} from "../controllers/categorycontroller";
import express from "express";

const router = express.Router();

router.get("/", getAllCategoriesController);
router.get("/:id", getCategoryBYIdController);
router.get("/:id/products", getProductsByCategoryIdController);
export default router;
