import Router, { Request, Response } from "express";
import multer from "multer";
import { photoController } from "../../controllers/photoController";
import { auth } from "../../controllers/authController";
import uploudConfig from "../../config/uploud";

const uploudAvatar = multer(uploudConfig);

export const photoRouter = Router();

photoRouter.patch(
  "/profile",
  auth.autheticate,

  uploudAvatar.single("avatar"),
  photoController.UploudImage.bind(photoController)
);
photoRouter.patch(
  "/install/userAdmin",

  uploudAvatar.single("avatar"),
  photoController.UploudImageAdmin.bind(photoController)
);
photoRouter.patch(
  "/install/store",

  uploudAvatar.single("storeAvatar"),
  photoController.UploudImageStore.bind(photoController)
);
