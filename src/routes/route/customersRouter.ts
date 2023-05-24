import { Router } from "express";
import { customerController } from "../../controllers/customerController";
import { auth } from "../../controllers/authController";
import { CostumersCounter } from "../../models/Customer.model";

export const customerRouter = Router();

customerRouter.get("/", customerController.getAll);

customerRouter.post("/", customerController.create);
customerRouter.delete("/:id", customerController.delete);
customerRouter.put("/:id");
customerRouter.get("/:id", customerController.getById);
