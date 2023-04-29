import Express from "express";
import { userControler } from "../../controllers/userController";
export const userRouter = Express.Router();

userRouter.post("/register", userControler.register);
userRouter.post("/login", userControler.login);
