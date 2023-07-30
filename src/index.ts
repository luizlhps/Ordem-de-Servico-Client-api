import { config } from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import { format } from "date-fns";

config();

import express from "express";
import {
  adminRouter,
  customerRouter,
  dashBoardRouter,
  financeRouter,
  orderRouter,
  passowordRecoveryRouter,
  serviceRouter,
  statusRouter,
  userRouter,
} from "./routes/";
import connectDatabase from "./database/connect";
import { errorValidation } from "./middleware/ErrosValidation";

connectDatabase();

const app = express();
app.use(cors());

const port = process.env.PORT || 7000;
app.use(express.json());
app.use(errorValidation.intanceError);
app.use("/", userRouter);
app.use("/", passowordRecoveryRouter);
app.use("/order", orderRouter);
app.use("/admin", adminRouter);
app.use("/finance", financeRouter);
app.use("/status", statusRouter);
app.use("/costumers", customerRouter);
app.use("/services", serviceRouter);
app.use("/dashboard", dashBoardRouter);

app.listen(port, () => console.log("Porta usada:", port));
