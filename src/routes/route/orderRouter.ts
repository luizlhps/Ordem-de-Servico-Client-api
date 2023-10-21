import express, { Request, Response } from "express";
import { orderController } from "../../controllers/orderController";
import { auth } from "../../controllers/authController";
import { authPermissionVerify } from "../../controllers/authPermissionVerify";

export const orderRouter = express.Router();

orderRouter.get(
  "/",
  auth.autheticate,
  authPermissionVerify.view({ parameter: "order" }),
  orderController.getAllOrders.bind(orderController)
);

orderRouter.get(
  "/customer",
  auth.autheticate,
  authPermissionVerify.view({ parameter: "order" }),
  orderController.getcustomerOrders.bind(orderController)
);

orderRouter.get(
  "/pending",
  auth.autheticate,
  authPermissionVerify.view({ parameter: "order" }),
  orderController.getOrderPending.bind(orderController)
);

orderRouter.post(
  "/",
  auth.autheticate,
  authPermissionVerify.create({ parameter: "order" }),
  orderController.createOrder.bind(orderController)
);

orderRouter.delete(
  "/:id",
  auth.autheticate,
  authPermissionVerify.delete({ parameter: "order" }),
  orderController.deleteOrder.bind(orderController)
);

orderRouter.put(
  "/:id",
  auth.autheticate,
  authPermissionVerify.update({ parameter: "order" }),
  orderController.updateOrder.bind(orderController)
);
