"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRouter = void 0;
var express_1 = __importDefault(require("express"));
var orderController_1 = require("../../controllers/orderController");
var authController_1 = require("../../controllers/authController");
var authPermissionVerify_1 = require("../../controllers/authPermissionVerify");
exports.orderRouter = express_1.default.Router();
exports.orderRouter.get("/", authController_1.auth.autheticate, authPermissionVerify_1.authPermissionVerify.view({ parameter: "order" }), orderController_1.orderController.getAllOrders.bind(orderController_1.orderController));
exports.orderRouter.get("/customer", authController_1.auth.autheticate, authPermissionVerify_1.authPermissionVerify.view({ parameter: "order" }), orderController_1.orderController.getcustomerOrders.bind(orderController_1.orderController));
exports.orderRouter.get("/pending", authController_1.auth.autheticate, authPermissionVerify_1.authPermissionVerify.view({ parameter: "order" }), orderController_1.orderController.getOrderPending.bind(orderController_1.orderController));
exports.orderRouter.post("/", authController_1.auth.autheticate, authPermissionVerify_1.authPermissionVerify.create({ parameter: "order" }), orderController_1.orderController.createOrder.bind(orderController_1.orderController));
exports.orderRouter.delete("/:id", authController_1.auth.autheticate, authPermissionVerify_1.authPermissionVerify.delete({ parameter: "order" }), orderController_1.orderController.deleteOrder.bind(orderController_1.orderController));
exports.orderRouter.put("/:id", authController_1.auth.autheticate, authPermissionVerify_1.authPermissionVerify.update({ parameter: "order" }), orderController_1.orderController.updateOrder.bind(orderController_1.orderController));
