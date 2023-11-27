"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
var express_1 = __importDefault(require("express"));
var userController_1 = require("../../controllers/userController");
var authController_1 = require("../../controllers/authController");
var authPermissionVerify_1 = require("../../controllers/authPermissionVerify");
exports.userRouter = express_1.default.Router();
exports.userRouter.post("/register", userController_1.userControler.register);
exports.userRouter.post("/login", userController_1.userControler.login);
exports.userRouter.get("/users", authController_1.auth.autheticate, authPermissionVerify_1.authPermissionVerify.view({ parameter: "admin" }), userController_1.userControler.getAll);
exports.userRouter.put("/user", authController_1.auth.autheticate, userController_1.userControler.updateProfileUser);
exports.userRouter.put("/user/:id", 
/*   auth.autheticate,
authPermissionVerify.update({ parameter: "admin" }), */
userController_1.userControler.updateOfficials);
exports.userRouter.delete("/user/:id", userController_1.userControler.delete);
exports.userRouter.get("/me", authController_1.auth.autheticate, userController_1.userControler.getMyInfo);
