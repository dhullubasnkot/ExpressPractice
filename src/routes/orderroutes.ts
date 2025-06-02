import { Router } from "express";
import {
  createOrder,
  deleteOrderById,
  getOrderById,
  updateOrderById,
} from "../controllers/orderscontroller";

const router = Router();

router.post("/", createOrder);
router.get("/:id", getOrderById);
router.put("/:id", updateOrderById);
router.delete("/:id", deleteOrderById);

export default router;
