import { Router } from "express";
import { authPermissionController } from "../../controllers/authPermissionController";

export const authPermissionRouter = Router();

authPermissionRouter.post("/", authPermissionController.create);
