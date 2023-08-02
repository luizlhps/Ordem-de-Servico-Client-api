import express, { Request, Response } from "express";
import { orderController } from "../../controllers/orderController";
import { auth } from "../../controllers/authController";
import { authPermissionVerify } from "../../controllers/authPermissionVerify";

export const orderRouter = express.Router();

orderRouter.get("/", auth.autheticate, authPermissionVerify.view({ parameter: "order" }), orderController.getAllOrders);
orderRouter.get(
  "/costumer",
  auth.autheticate,
  authPermissionVerify.view({ parameter: "order" }),
  orderController.getCostumerOrders
);
orderRouter.get(
  "/pending",
  auth.autheticate,
  authPermissionVerify.view({ parameter: "order" }),
  orderController.getOrderPending
);
orderRouter.post(
  "/",
  auth.autheticate,
  authPermissionVerify.create({ parameter: "order" }),
  orderController.createOrder
);
orderRouter.delete(
  "/:id",
  auth.autheticate,
  authPermissionVerify.delete({ parameter: "order" }),
  orderController.deleteOrder
);
orderRouter.put(
  "/:id",
  auth.autheticate,
  authPermissionVerify.update({ parameter: "order" }),
  orderController.updateOrder
);
