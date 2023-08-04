import Express from "express";
import { statusController } from "../../controllers/statusController";
import { service } from "../../controllers/serviceController";
import { auth } from "../../controllers/authController";
import { authPermissionVerify } from "../../controllers/authPermissionVerify";

export const serviceRouter = Express.Router();

serviceRouter.post(
  "/",
  auth.autheticate,
  authPermissionVerify.create({ parameter: "services" }),
  service.createService
);
/* serviceRouter.get("/search", service.getSearch); */
serviceRouter.get("/", auth.autheticate, authPermissionVerify.view({ parameter: "services" }), service.getSearch);

serviceRouter.delete(
  "/:id",
  auth.autheticate,
  authPermissionVerify.delete({ parameter: "services" }),
  service.deleteService
);

serviceRouter.put(
  "/:id",
  auth.autheticate,
  authPermissionVerify.update({ parameter: "services" }),
  service.updateService
);
