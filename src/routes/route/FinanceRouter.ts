import Express from "express";
import { finance } from "../../controllers/financeController";

export const financeRouter = Express.Router();

financeRouter.post("/", finance.createtransaction);
financeRouter.put("/:id", finance.updatetransaction);
financeRouter.delete("/:id", finance.deletetransaction);
financeRouter.get("/", finance.getAlltransaction);
