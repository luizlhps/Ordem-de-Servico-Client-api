"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passowordRecoveryRouter = void 0;
var express_1 = require("express");
var recoveryPassowrdController_1 = require("../../controllers/recoveryPassowrdController");
exports.passowordRecoveryRouter = (0, express_1.Router)();
exports.passowordRecoveryRouter.post("/forgetPassword", recoveryPassowrdController_1.passowordRecoveryController.ForgetPassword);
exports.passowordRecoveryRouter.post("/ResetPassword", recoveryPassowrdController_1.passowordRecoveryController.resetPassword);
