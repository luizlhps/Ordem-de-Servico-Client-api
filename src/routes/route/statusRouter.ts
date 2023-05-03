import Express from "express";
import { statusController } from "../../controllers/statusController";

export const statusRouter = Express.Router();

statusRouter.post("/", statusController.create);
statusRouter.get("/", statusController.getAll);
statusRouter.get("/:id", statusController.getAll);
statusRouter.delete("/:id", statusController.delete);
statusRouter.put("/:id", statusController.update);
