import { Router } from "express";
import { customerController } from "../../controllers/customerController";
import { auth } from "../../controllers/authController";
import { CostumersCounter } from "../../models/Costomer.model";

export const customerRouter = Router();

customerRouter.get("/", customerController.getAll);

customerRouter.post("/", customerController.create);
customerRouter.delete("/:id", customerController.delete);
customerRouter.put("/:id", customerController.update);
customerRouter.get("/:id", customerController.getById);
