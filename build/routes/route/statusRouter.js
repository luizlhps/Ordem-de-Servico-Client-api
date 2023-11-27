"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.statusRouter = void 0;
var express_1 = __importDefault(require("express"));
var statusController_1 = require("../../controllers/statusController");
var authController_1 = require("../../controllers/authController");
var authPermissionVerify_1 = require("../../controllers/authPermissionVerify");
exports.statusRouter = express_1.default.Router();
exports.statusRouter.post("/", authController_1.auth.autheticate, authPermissionVerify_1.authPermissionVerify.create({ parameter: "status" }), statusController_1.statusController.create);
exports.statusRouter.get("/", authController_1.auth.autheticate, authPermissionVerify_1.authPermissionVerify.view({ parameter: "status" }), statusController_1.statusController.getAll);
exports.statusRouter.delete("/:id", authController_1.auth.autheticate, authPermissionVerify_1.authPermissionVerify.delete({ parameter: "status" }), statusController_1.statusController.delete);
exports.statusRouter.put("/:id", authController_1.auth.autheticate, authPermissionVerify_1.authPermissionVerify.update({ parameter: "status" }), statusController_1.statusController.update);
