import Express from "express";
import { finance } from "../../controllers/financeController";
import { auth } from "../../controllers/authController";
import { authPermissionVerify } from "../../controllers/authPermissionVerify";

export const financeRouter = Express.Router();

financeRouter.post(
  "/",
  auth.autheticate,
  authPermissionVerify.create({ parameter: "finance" }),
  finance.createTransaction.bind(finance)
);

financeRouter.put(
  "/:id",
  auth.autheticate,
  authPermissionVerify.update({ parameter: "finance" }),
  finance.updateTransaction.bind(finance)
);

financeRouter.delete(
  "/:id",
  auth.autheticate,
  authPermissionVerify.delete({ parameter: "finance" }),
  finance.deleteTransaction
);

financeRouter.get(
  "/",
  auth.autheticate,
  authPermissionVerify.view({ parameter: "finance" }),
  finance.searchTransaction
);

financeRouter.get("/balance", auth.autheticate, authPermissionVerify.view({ parameter: "finance" }), finance.balance);

financeRouter.get(
  "/:id",
  auth.autheticate,
  authPermissionVerify.view({ parameter: "finance" }),
  finance.searchTransaction
);
