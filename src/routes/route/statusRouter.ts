import Express from "express";
import { statusController } from "../../controllers/statusController";
import { auth } from "../../controllers/authController";
import { authPermissionVerify } from "../../controllers/authPermissionVerify";

export const statusRouter = Express.Router();

statusRouter.post("/", auth.autheticate, authPermissionVerify.create({ parameter: "status" }), statusController.create);

statusRouter.get("/", auth.autheticate, authPermissionVerify.view({ parameter: "services" }), statusController.getAll);

statusRouter.delete(
  "/:id",
  auth.autheticate,
  authPermissionVerify.delete({ parameter: "services" }),
  statusController.delete
);

statusRouter.put(
  "/:id",
  auth.autheticate,
  authPermissionVerify.update({ parameter: "services" }),
  statusController.update
);
