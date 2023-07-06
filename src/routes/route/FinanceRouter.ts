import Express from "express";
import { finance } from "../../controllers/financeController";

export const financeRouter = Express.Router();

financeRouter.post("/", finance.createTransaction.bind(finance));
financeRouter.put("/:id", finance.updateTransaction.bind(finance));
financeRouter.delete("/:id", finance.deleteTransaction);
financeRouter.get("/", finance.searchTransaction);
financeRouter.get("/balance", finance.balance);
financeRouter.get("/:id", finance.searchTransaction);
