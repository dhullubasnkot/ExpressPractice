import { getAllCategoriesController } from "../controllers/categorycontroller";
import express from "express";

const router = express.Router();

router.get("/", getAllCategoriesController);
export default router;
