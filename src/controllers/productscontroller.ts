import { Request, Response } from "express";
import {
  getAllProducts,
  getProductById,
  createProductDetails,
  updateProductDetails,
  deleteProductById,
} from "../model/product";
import { SqlProductModel } from "../sql-models/product-sql-model";

export const getAllProductsController = async (req: Request, res: Response) => {
  const products = await SqlProductModel.getAll();
  res.json(products);
};

export const getProductByIdController = async (req: Request, res: Response) => {
  // const id = parseInt(req.params.id);
  // const product = getProductById(id);
  // if (!product) res.status(404).json({ error: "Product not found" });
  // res.status(200).json(product);
  const id = parseInt(req.params.id);
  try {
    const product = await SqlProductModel.getById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ error: "Product not found" });
  }
};

export const createProductController = (req: Request, res: Response) => {
  const { name, price, description } = req.body;
  const newProduct = createProductDetails({ name, price, description });
  res.status(201).json(newProduct);
};

export const updateProductController = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { name, price, description } = req.body;

  const updated = updateProductDetails(id, { name, price, description });
  if (!updated) res.status(404).json({ error: "Product not found" });

  res.status(200).json(updated);
};

export const deleteProductController = async (req: Request, res: Response) => {
  // const id = parseInt(req.params.id);
  // const deleted = deleteProductById(id);
  // if (!deleted) res.status(404).json({ error: "Product not found" });

  // res.status(200).json(deleted);
  const id = parseInt(req.params.id);
  try {
    await SqlProductModel.DeleteById(id);
    res
      .status(200)
      .json({ message: `Product with id ${id} deleted successfully` });
  } catch (error) {
    res.status(404).json({ error: `Product with id ${id} not found` });
  }
};
