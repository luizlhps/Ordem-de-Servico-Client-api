import Express from "express";
import { statusController } from "../../controllers/statusController";
import { service } from "../../controllers/serviceController";

export const serviceRouter = Express.Router();

serviceRouter.post("/", service.createService);
