import express, { Request, Response } from "express";
import { orderController } from "../../controllers/orderController";

export const orderRouter = express.Router();

orderRouter.get("/", orderController.getByIdOrder);
orderRouter.post("/", orderController.createOrder);
orderRouter.delete("/order/:id");
orderRouter.put("/order/:id");
