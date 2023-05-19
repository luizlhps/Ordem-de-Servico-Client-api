import { config } from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import { format } from "date-fns";

config();

mongoose.plugin((schema: any) => {
  schema.set("toJSON", {
    getters: true,
    virtuals: false,
    transform: (doc: any, ret: any) => {
      ret.createdAt = format(ret.createdAt, "dd/MM/yyyy HH:mm:ss");
      ret.updatedAt = format(ret.updatedAt, "dd/MM/yyyy HH:mm:ss");
      delete ret._id;
      delete ret.__v;
      return ret;
    },
  });
});

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

app.listen(port, () => console.log("Porta usada:", port));
