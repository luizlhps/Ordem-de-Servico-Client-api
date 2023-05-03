import express from "express";

export const orderRouter = express.Router();

orderRouter.get("/order");
orderRouter.post("/order/");
orderRouter.delete("/order/:id");
orderRouter.put("/order/:id");
