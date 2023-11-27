"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configApplicationRouter = void 0;
var express_1 = require("express");
var configApplication_1 = require("../../controllers/configApplication");
var multer_1 = __importDefault(require("multer"));
var uploud_1 = __importDefault(require("../../config/uploud"));
var uploudAvatar = (0, multer_1.default)(uploud_1.default);
exports.configApplicationRouter = (0, express_1.Router)();
exports.configApplicationRouter.post("/install/store", configApplication_1.configApplication.store);
exports.configApplicationRouter.post("/install/userAdmin", configApplication_1.configApplication.userAdmin);
exports.configApplicationRouter.put("/store", configApplication_1.configApplication.updateStore);
exports.configApplicationRouter.get("/store", configApplication_1.configApplication.getInfoStore);
