import express, { Request, Response } from "express";
import { orderController } from "../../controllers/orderController";

export const orderRouter = express.Router();

orderRouter.get("/", orderController.getAllOrders);
orderRouter.get("/costumer", orderController.getCostumerOrders);
orderRouter.get("/pending", orderController.getOrderPending);
orderRouter.post("/", orderController.createOrder);
orderRouter.delete("/:id", orderController.deleteOrder);
orderRouter.put("/:id", orderController.updateOrder);
