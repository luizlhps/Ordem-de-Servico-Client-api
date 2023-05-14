import Express from "express";
import { userControler } from "../../controllers/userController";
import { AuthenticatedRequest, auth } from "../../controllers/authController";
export const adminRouter = Express.Router();

adminRouter.get("/", auth.autheticate, async (req, res) => {
  res.json("So pode ser visto pelo adm");
});
