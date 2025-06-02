import { Request, Response, NextFunction } from "express";
import { SqlOrderModel } from "../sql-models/order_sql_models";
import { SqlProductModel } from "../sql-models/product-sql-model";
import { SqlUserModel } from "../sql-models/users-sql-models";

// Validate order input
async function validateOrderInput(body: any) {
  if (typeof body.userId !== "number") {
    return "userId must be a number";
  }

  if (!Array.isArray(body.productIds) || body.productIds.length === 0) {
    return "productIds must be a non-empty array";
  }

  const user = await SqlUserModel.getById(body.userId);
  if (!user) {
    return "User does not exist";
  }

  for (const pid of body.productIds) {
    const product = await SqlProductModel.getById(pid);
    if (!product) {
      return `Product with id ${pid} does not exist`;
    }
  }

  return null;
}

// Create order
export const createOrder = async (req: Request, res: Response) => {
  try {
    const error = await validateOrderInput(req.body);
    if (error) {
      res.status(400).json({ message: error });
      return;
    }

    const order = await SqlOrderModel.create(req.body);
    res.status(201).json(order);
  } catch (err) {
    console.error("Order creation error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get order by ID
export const getOrderById = async (req: Request, res: Response) => {
  try {
    const orderId = Number(req.params.id);
    if (isNaN(orderId)) {
      res.status(400).json({ message: "Invalid order id" });
      return;
    }

    const order = await SqlOrderModel.getOneOrderById(orderId);
    if (!order) {
      res.status(404).json({ message: "Order not found" });
      return;
    }

    res.status(200).json(order);
  } catch (err) {
    console.error("Get order error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update order by ID
export const updateOrderById = async (req: Request, res: Response) => {
  try {
    const orderId = Number(req.params.id);
    if (isNaN(orderId)) {
      res.status(400).json({ message: "Invalid order id" });
      return;
    }

    const error = await validateOrderInput(req.body);
    if (error) {
      res.status(400).json({ message: error });
      return;
    }

    const updatedOrder = await SqlOrderModel.updateOrderById(orderId, req.body);
    if (!updatedOrder) {
      res.status(404).json({ message: "Order not found" });
      return;
    }

    res.status(200).json(updatedOrder);
  } catch (err) {
    console.error("Update order error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete order by ID
export const deleteOrderById = async (req: Request, res: Response) => {
  try {
    const orderId = Number(req.params.id);
    if (isNaN(orderId)) {
      res.status(400).json({ message: "Invalid order id" });
      return;
    }

    const deleted = await SqlOrderModel.deleteOrderById(orderId);
    if (!deleted) {
      res.status(404).json({ message: "Order not found" });
      return;
    }

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (err) {
    console.error("Delete order error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
