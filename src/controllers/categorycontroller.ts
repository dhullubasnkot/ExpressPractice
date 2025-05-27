import { Request, Response } from "express";
import { sqlCategoryModel } from "../sql-models/category-sql-model";

// Get all categories
export const getAllCategoriesController = async (
  req: Request,
  res: Response
) => {
  try {
    const categories = await sqlCategoryModel.getAllCategories();
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error Fetching Categories:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get category by ID
export const getCategoryBYIdController = async (
  req: Request,
  res: Response
) => {
  const id = parseInt(req.params.id);
  try {
    const category = await sqlCategoryModel.getCategoryById(id);
    res.status(200).json(category);
  } catch (error) {
    res.status(404).json({ error: "Category Not Found" });
  }
};

// ✅ Get products by category ID
export const getProductsByCategoryIdController = async (
  req: Request,
  res: Response
) => {
  const categoryId = parseInt(req.params.id);
  try {
    const products = await sqlCategoryModel.getProductsByCategoryId(categoryId);
    res.status(200).json(products);
  } catch (error) {
    console.error("Error Fetching Products By Category:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
