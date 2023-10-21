import { Router } from "express";
import { customerController } from "../../controllers/customerController";
import { authPermissionVerify } from "../../controllers/authPermissionVerify";
import { auth } from "../../controllers/authController";

export const customerRouter = Router();

customerRouter.get(
  "/",
  auth.autheticate,
  authPermissionVerify.view({ parameter: "customer" }),
  customerController.getAll
);

customerRouter.post(
  "/",
  auth.autheticate,
  authPermissionVerify.create({ parameter: "customer" }),
  customerController.create
);

customerRouter.delete(
  "/:id",
  auth.autheticate,
  authPermissionVerify.delete({ parameter: "customer" }),
  customerController.delete
);

customerRouter.put(
  "/:id",
  auth.autheticate,
  authPermissionVerify.update({ parameter: "customer" }),
  customerController.update
);

customerRouter.get(
  "/:id",
  auth.autheticate,
  authPermissionVerify.view({ parameter: "customer" }),
  customerController.getById
);
