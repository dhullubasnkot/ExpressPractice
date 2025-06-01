import { Router } from "express";
import { createOrder } from "../controllers/orderscontroller";

const router = Router();
router.post("/", createOrder);

export default router;
