"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.financeRouter = void 0;
var express_1 = __importDefault(require("express"));
var financeController_1 = require("../../controllers/financeController");
var authController_1 = require("../../controllers/authController");
var authPermissionVerify_1 = require("../../controllers/authPermissionVerify");
exports.financeRouter = express_1.default.Router();
exports.financeRouter.post("/", authController_1.auth.autheticate, authPermissionVerify_1.authPermissionVerify.create({ parameter: "finance" }), financeController_1.finance.createTransaction.bind(financeController_1.finance));
exports.financeRouter.put("/:id", authController_1.auth.autheticate, authPermissionVerify_1.authPermissionVerify.update({ parameter: "finance" }), financeController_1.finance.updateTransaction.bind(financeController_1.finance));
exports.financeRouter.delete("/:id", authController_1.auth.autheticate, authPermissionVerify_1.authPermissionVerify.delete({ parameter: "finance" }), financeController_1.finance.deleteTransaction);
exports.financeRouter.get("/", authController_1.auth.autheticate, authPermissionVerify_1.authPermissionVerify.view({ parameter: "finance" }), financeController_1.finance.searchTransaction);
exports.financeRouter.get("/balance", authController_1.auth.autheticate, authPermissionVerify_1.authPermissionVerify.view({ parameter: "finance" }), financeController_1.finance.balance);
exports.financeRouter.get("/:id", authController_1.auth.autheticate, authPermissionVerify_1.authPermissionVerify.view({ parameter: "finance" }), financeController_1.finance.searchTransaction);
