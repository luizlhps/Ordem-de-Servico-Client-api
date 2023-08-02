import { Router } from "express";
import { dashboardController } from "../../controllers/dashBoardController";
import { auth } from "../../controllers/authController";
import { authPermissionVerify } from "../../controllers/authPermissionVerify";

export const dashBoardRouter = Router();

dashBoardRouter.get(
  "/",
  auth.autheticate,
  authPermissionVerify.view({ parameter: "dashboard" }),
  dashboardController.GetAllInfo.bind(dashboardController)
);
