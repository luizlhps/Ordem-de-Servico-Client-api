import { Router } from "express";
import { configApplication } from "../../controllers/configApplication";

export const configApplicationRouter = Router();

configApplicationRouter.post("/store", configApplication.store);
configApplicationRouter.post("/userAdmin", configApplication.userAdmin);
