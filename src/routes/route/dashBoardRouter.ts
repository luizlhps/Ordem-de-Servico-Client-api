import { Router } from "express";
import { dashboardController } from "../../controllers/dashBoardController";

export const dashBoardRouter = Router();

dashBoardRouter.get("/", dashboardController.GetAllInfo);
