import { Router } from "express";
import { customerController } from "../../controllers/customerController";
import { auth } from "../../controllers/authController";

export const customerRouter = Router();

customerRouter.get("/", async (req, res) => {
  res.send("So pode ser visto pelo adm");
});

customerRouter.post("/", customerController.create);
customerRouter.delete("/:id");
customerRouter.put("/:id");
