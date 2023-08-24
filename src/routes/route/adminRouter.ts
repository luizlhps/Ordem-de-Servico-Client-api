import Express, { Request, Response } from "express";
import { auth } from "../../controllers/authController";
import { authPermissionVerify } from "../../controllers/authPermissionVerify";
import { IRequest } from "../../types/requestType";
import { handleRefreshToken } from "../../controllers/handleRefreshToken";
export const adminRouter = Express.Router();

adminRouter.get("/", async (req: IRequest, res: Response) => {
  try {
    res.json("Só pode ser visto pelo adm");
  } catch (error) {
    console.log(error);
  }
  /*  console.log("aqu", req?.user); */
});
