import Express from "express";
import { auth } from "../../controllers/authController";
export const adminRouter = Express.Router();

adminRouter.get("/", auth.autheticate, async (req, res) => {
  res.json("So pode ser visto pelo adm");
});
