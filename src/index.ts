import { config } from "dotenv";
config();

import express from "express";
import { adminRouter, financeRouter, statusRouter, userRouter } from "./routes/";
import connectDatabase from "./database/connect";

connectDatabase();

const app = express();

const port = process.env.PORT || 7000;

app.use(express.json());
app.use("/", userRouter);
app.use("/admin", adminRouter);
app.use("/finance", financeRouter);
app.use("/status", statusRouter);

app.listen(port, () => console.log("Porta usada:", port));
