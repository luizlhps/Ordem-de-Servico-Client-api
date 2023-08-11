import Router, { Request, Response } from "express";
import multer from "multer";
import { photoProfileController } from "../../controllers/photoProfileController";
import { auth } from "../../controllers/authController";
import uploudConfig from "../../config/uploud";

const uploudAvatar = multer(uploudConfig.uploud("./tmp/avatar"));

export const photoProfileRouter = Router();

photoProfileRouter.patch(
  "/profile",
  auth.autheticate,

  uploudAvatar.single("avatar"),
  photoProfileController.UploudImage
);
