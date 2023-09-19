import { Router } from "express";
import { authGroupController } from "../../controllers/authGroupController";
import { authPermissionVerify } from "../../controllers/authPermissionVerify";
import { auth } from "../../controllers/authController";

export const authGroupRouter = Router();

authGroupRouter.post(
  "/",
  auth.autheticate,
  authPermissionVerify.create({ parameter: "permissionsGroup" }),
  authGroupController.create
);
authGroupRouter.put(
  "/:id",
  auth.autheticate,
  authPermissionVerify.update({ parameter: "permissionsGroup" }),
  authGroupController.update
);
authGroupRouter.get(
  "/",
  auth.autheticate,
  authPermissionVerify.view({ parameter: "permissionsGroup" }),
  authGroupController.getAll
);
