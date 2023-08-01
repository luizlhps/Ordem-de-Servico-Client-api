import { Router } from "express";
import { authGroupController } from "../../controllers/authGroupController";

export const authGroupRouter = Router();

authGroupRouter.post("/", authGroupController.create);
