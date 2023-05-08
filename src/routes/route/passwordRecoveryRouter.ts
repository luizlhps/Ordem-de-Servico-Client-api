import { Router } from "express";
import { passowordRecoveryController } from "../../controllers/recoveryPassowrdController";

export const passowordRecoveryRouter = Router();

passowordRecoveryRouter.post("/forgetPassowrd", passowordRecoveryController.ForgetPassword);
