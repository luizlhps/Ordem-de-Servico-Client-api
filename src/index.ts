import { config } from "dotenv";
import cors from "cors";
import multer from "multer";

config();

import express from "express";
import {
  adminRouter,
  authGroupRouter,
  configApplicationRouter,
  customerRouter,
  dashBoardRouter,
  financeRouter,
  orderRouter,
  passowordRecoveryRouter,
  photoRouter,
  refreshTokenRouter,
  serviceRouter,
  statusRouter,
  userRouter,
} from "./routes/";
import connectDatabase from "./database/connect";
import { errorValidation } from "./middleware/ErrosValidation";
import { storeValidation } from "./middleware/StoreValidation";

connectDatabase();

const app = express();
app.use(cors());

const port = process.env.PORT || 7000;
app.use(express.json());
app.use(errorValidation.intanceError);
app.use((req, res, next) => {
  if (req.path === "/install/store" || req.path === "/install/userAdmin") {
    return next();
  }

  storeValidation.exec(req, res, next);
});
app.use("/", photoRouter);
app.use("/", userRouter);
app.use("/", passowordRecoveryRouter);
app.use("/order", orderRouter);
app.use("/admin", adminRouter);
app.use("/finance", financeRouter);
app.use("/status", statusRouter);
app.use("/customers", customerRouter);
app.use("/services", serviceRouter);
app.use("/dashboard", dashBoardRouter);
app.use("/authGroup", authGroupRouter);
app.use("/refreshToken", refreshTokenRouter);
app.use("/", configApplicationRouter);

app.listen(port, () => console.log("Porta usada:", port));
