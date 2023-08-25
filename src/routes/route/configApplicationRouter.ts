import { Router } from "express";
import { configApplication } from "../../controllers/configApplication";
import multer from "multer";
import uploudConfig from "../../config/uploud";

const uploudAvatar = multer(uploudConfig);

export const configApplicationRouter = Router();

configApplicationRouter.post("/store", configApplication.store);
configApplicationRouter.post("/userAdmin", configApplication.userAdmin);
