import { Router } from "express";
import { authGroupController } from "../../controllers/authGroupController";

export const authGroupRouter = Router();

authGroupRouter.post("/", authGroupController.create);
authGroupRouter.put("/:id", authGroupController.update);
authGroupRouter.get("/", authGroupController.getAll);
