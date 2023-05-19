import Express from "express";
import { statusController } from "../../controllers/statusController";
import { service } from "../../controllers/serviceController";

export const serviceRouter = Express.Router();

serviceRouter.post("/", service.createService);
/* serviceRouter.get("/search", service.getSearch); */
serviceRouter.get("/", service.getSearch);
serviceRouter.delete("/:id", service.deleteService);
serviceRouter.put("/:id", service.updateService);
