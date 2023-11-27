"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceRouter = void 0;
var express_1 = __importDefault(require("express"));
var serviceController_1 = require("../../controllers/serviceController");
var authController_1 = require("../../controllers/authController");
var authPermissionVerify_1 = require("../../controllers/authPermissionVerify");
exports.serviceRouter = express_1.default.Router();
exports.serviceRouter.post("/", authController_1.auth.autheticate, authPermissionVerify_1.authPermissionVerify.create({ parameter: "services" }), serviceController_1.service.createService);
/* serviceRouter.get("/search", service.getSearch); */
exports.serviceRouter.get("/", authController_1.auth.autheticate, authPermissionVerify_1.authPermissionVerify.view({ parameter: "services" }), serviceController_1.service.getSearch);
exports.serviceRouter.delete("/:id", authController_1.auth.autheticate, authPermissionVerify_1.authPermissionVerify.delete({ parameter: "services" }), serviceController_1.service.deleteService);
exports.serviceRouter.put("/:id", authController_1.auth.autheticate, authPermissionVerify_1.authPermissionVerify.update({ parameter: "services" }), serviceController_1.service.updateService);
