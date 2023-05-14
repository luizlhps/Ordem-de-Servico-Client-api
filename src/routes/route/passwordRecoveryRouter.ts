import { Router } from "express";
import { passowordRecoveryController } from "../../controllers/recoveryPassowrdController";

export const passowordRecoveryRouter = Router();

passowordRecoveryRouter.post("/forgetPassword", passowordRecoveryController.ForgetPassword);
passowordRecoveryRouter.post("/ResetPassword", passowordRecoveryController.resetPassword);
