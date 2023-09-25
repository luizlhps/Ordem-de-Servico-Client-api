import { Router } from "express";
import { configApplication } from "../../controllers/configApplication";
import multer from "multer";
import uploudConfig from "../../config/uploud";

const uploudAvatar = multer(uploudConfig);

export const configApplicationRouter = Router();

configApplicationRouter.post("/install/store", configApplication.store);
configApplicationRouter.post("/install/userAdmin", configApplication.userAdmin);
configApplicationRouter.put("/store", configApplication.updateStore);
configApplicationRouter.get("/store", configApplication.getInfoStore);
