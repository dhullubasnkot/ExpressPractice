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
  // const { name, price, description } = req.body;
  // const newProduct = createProductDetails({ name, price, description });
  // res.status(201).json(newProduct);
  const { name, description, price, stock_quantity } = req.body;
  SqlProductModel.createProductDetails({
    name,
    description,
    price,
    stock_quantity,
  })
    .then((newProduct) => {
      res.status(201).json(newProduct);
    })
    .catch((error: any) => {
      console.error("Create error:", error.message || error);
      res.status(500).json({ error: error.message || "Internal Server Error" });
    });
};

export const updateProductController = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { name, description, price, stock_quantity } = req.body;

  try {
    const updatedProduct = await SqlProductModel.UpdateProduct(id, {
      name,
      description,
      price,
      stock_quantity,
    });
    res.status(200).json(updatedProduct);
  } catch (error: any) {
    console.error("Update error:", error.message || error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
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
