import { config } from "dotenv";
import cors from "cors";

config();

import express from "express";
import {
  adminRouter,
  customerRouter,
  financeRouter,
  orderRouter,
  passowordRecoveryRouter,
  serviceRouter,
  statusRouter,
  userRouter,
} from "./routes/";
import connectDatabase from "./database/connect";

connectDatabase();

const app = express();
app.use(cors());

const port = process.env.PORT || 7000;
app.use(express.json());
app.use("/", userRouter);
app.use("/", passowordRecoveryRouter);
app.use("/order", orderRouter);
app.use("/admin", adminRouter);
app.use("/finance", financeRouter);
app.use("/status", statusRouter);
app.use("/costumers", customerRouter);
app.use("/services", serviceRouter);

app.listen(port, () => console.log("Porta usada:", port));
