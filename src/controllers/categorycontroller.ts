import { Request, Response } from "express";

import { sqlCategoryModel } from "../sql-models/category-sql-model";

export const getAllCategoriesController = async (
  req: Request,
  res: Response
) => {
  try {
    const categories = await sqlCategoryModel.getAllCategorys();
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error Fetching Categories:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const getCategoryBYIdController = async (
  req: Request,
  res: Response
) => {
  const id = parseInt(req.params.id);
  try {
    const categories = await sqlCategoryModel.getCategoryById(id);
    res.status(200).json(categories);
  } catch (error) {
    res.status(404).json({ error: "Category Not Found:" });
  }
};
