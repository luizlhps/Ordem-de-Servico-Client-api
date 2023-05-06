import Express from "express";
import { finance } from "../../controllers/financeController";

export const financeRouter = Express.Router();

financeRouter.post("/", finance.createTransaction);
financeRouter.put("/:id", finance.updateTransaction);
financeRouter.delete("/:id", finance.deleteTransaction);

financeRouter.get("/search", finance.searchTransaction);
financeRouter.get("/:id", finance.searchTransaction);
