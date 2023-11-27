import Express, { Response } from "express";
import { IRequest } from "../../types/requestType";
export const adminRouter = Express.Router();

adminRouter.get("/", async (req: IRequest, res: Response) => {
  try {
    res.json("Só pode ser visto pelo adm");
  } catch (error) {
    console.log(error);
  }
});
