"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashBoardRouter = void 0;
var express_1 = require("express");
var dashBoardController_1 = require("../../controllers/dashBoardController");
var authController_1 = require("../../controllers/authController");
var authPermissionVerify_1 = require("../../controllers/authPermissionVerify");
exports.dashBoardRouter = (0, express_1.Router)();
exports.dashBoardRouter.get("/", authController_1.auth.autheticate, authPermissionVerify_1.authPermissionVerify.view({ parameter: "dashboard" }), dashBoardController_1.dashboardController.GetAllInfo.bind(dashBoardController_1.dashboardController));
