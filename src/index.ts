import { config } from "dotenv";
config();

import express from "express";
import { adminRouter, userRouter } from "./routes/";
import connectDatabase from "./database/connect";

connectDatabase();

const app = express();

const port = process.env.PORT || 7000;

app.use(express.json());
app.use("/", userRouter);
app.use("/admin", adminRouter);

app.listen(port, () => console.log("Porta usada:", port));
