import {
  getAllCategoriesController,
  getCategoryBYIdController,
} from "../controllers/categorycontroller";
import express from "express";

const router = express.Router();

router.get("/", getAllCategoriesController);
router.get("/:id", getCategoryBYIdController);
export default router;
