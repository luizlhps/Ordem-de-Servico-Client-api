import Express from "express";
import { userControler } from "../../controllers/userController";
import { auth } from "../../controllers/authController";
import { authPermissionVerify } from "../../controllers/authPermissionVerify";
export const userRouter = Express.Router();

userRouter.post("/register", userControler.register);
userRouter.post("/login", userControler.login);
userRouter.get("/users", auth.autheticate, authPermissionVerify.view({ parameter: "admin" }), userControler.getAll);
/* userRouter.put("/users", userControler.); */
userRouter.get("/me", auth.autheticate, authPermissionVerify.view({ parameter: "customer" }), userControler.getById);
