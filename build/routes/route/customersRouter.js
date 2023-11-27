"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerRouter = void 0;
var express_1 = require("express");
var customerController_1 = require("../../controllers/customerController");
var authPermissionVerify_1 = require("../../controllers/authPermissionVerify");
var authController_1 = require("../../controllers/authController");
exports.customerRouter = (0, express_1.Router)();
exports.customerRouter.get("/", authController_1.auth.autheticate, authPermissionVerify_1.authPermissionVerify.view({ parameter: "customer" }), customerController_1.customerController.getAll);
exports.customerRouter.post("/", authController_1.auth.autheticate, authPermissionVerify_1.authPermissionVerify.create({ parameter: "customer" }), customerController_1.customerController.create);
exports.customerRouter.delete("/:id", authController_1.auth.autheticate, authPermissionVerify_1.authPermissionVerify.delete({ parameter: "customer" }), customerController_1.customerController.delete);
exports.customerRouter.put("/:id", authController_1.auth.autheticate, authPermissionVerify_1.authPermissionVerify.update({ parameter: "customer" }), customerController_1.customerController.update);
exports.customerRouter.get("/:id", authController_1.auth.autheticate, authPermissionVerify_1.authPermissionVerify.view({ parameter: "customer" }), customerController_1.customerController.getById);
