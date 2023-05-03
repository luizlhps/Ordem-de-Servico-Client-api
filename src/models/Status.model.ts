import mongoose, { Schema, Document, model } from "mongoose";
import { string } from "joi";
import { userSchema } from "./User.model";

const userSubSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: false },
  password: { type: String, required: false },
});

const statusSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    user: {
      type: userSubSchema,
      required: false,
      select: false,
    },
  },

  { versionKey: false, timestamps: true }
);

export const Status = model("Status", statusSchema);
