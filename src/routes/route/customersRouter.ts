import { Router } from "express";
import { customerController } from "../../controllers/costumerController";

export const customerRouter = Router();

customerRouter.get("/", customerController.getAll);

customerRouter.post("/", customerController.create);
customerRouter.delete("/:id", customerController.delete);
customerRouter.put("/:id", customerController.update);
customerRouter.get("/:id", customerController.getById);
