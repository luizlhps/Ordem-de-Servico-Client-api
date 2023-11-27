"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.photoRouter = void 0;
var express_1 = __importDefault(require("express"));
var multer_1 = __importDefault(require("multer"));
var photoController_1 = require("../../controllers/photoController");
var authController_1 = require("../../controllers/authController");
var uploud_1 = __importDefault(require("../../config/uploud"));
var uploudAvatar = (0, multer_1.default)(uploud_1.default);
exports.photoRouter = (0, express_1.default)();
exports.photoRouter.patch("/profile", authController_1.auth.autheticate, uploudAvatar.single("avatar"), photoController_1.photoController.UploudImage.bind(photoController_1.photoController));
exports.photoRouter.patch("/install/userAdmin", uploudAvatar.single("avatar"), photoController_1.photoController.UploudImageAdmin.bind(photoController_1.photoController));
exports.photoRouter.patch("/install/store", uploudAvatar.single("storeAvatar"), photoController_1.photoController.UploudImageStoreConfig.bind(photoController_1.photoController));
exports.photoRouter.patch("/store", uploudAvatar.single("storeAvatar"), photoController_1.photoController.UploudImageStore.bind(photoController_1.photoController));
