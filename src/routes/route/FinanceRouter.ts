import Express from "express";
import { finance } from "../../controllers/financeController";
import { auth } from "../../controllers/authController";
import { authPermissionVerify } from "../../controllers/authPermissionVerify";

export const financeRouter = Express.Router();

financeRouter.post(
  "/",
  auth.autheticate,
  authPermissionVerify.update({ parameter: "order" }),
  finance.createTransaction.bind(finance)
);

financeRouter.put(
  "/:id",
  auth.autheticate,
  authPermissionVerify.update({ parameter: "order" }),
  finance.updateTransaction.bind(finance)
);

financeRouter.delete(
  "/:id",
  auth.autheticate,
  authPermissionVerify.update({ parameter: "order" }),
  finance.deleteTransaction
);

financeRouter.get(
  "/",
  auth.autheticate,
  authPermissionVerify.update({ parameter: "order" }),
  finance.searchTransaction
);

financeRouter.get("/balance", auth.autheticate, authPermissionVerify.update({ parameter: "order" }), finance.balance);

financeRouter.get(
  "/:id",
  auth.autheticate,
  authPermissionVerify.update({ parameter: "order" }),
  finance.searchTransaction
);
